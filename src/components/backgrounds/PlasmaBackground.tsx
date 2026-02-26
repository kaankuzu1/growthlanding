"use client";

import { useEffect, useRef } from "react";

interface PlasmaBackgroundProps {
  color?: string;
  speed?: number;
  scale?: number;
  opacity?: number;
  className?: string;
}

function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [0.5, 0.3, 1.0];
  return [
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255,
  ];
}

const vertexShader = `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0, 1);
  }
`;

const fragmentShader = `
  precision highp float;
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uSpeed;
  uniform float uScale;
  varying vec2 vUv;

  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
      + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x_ = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x_) - 0.5;
    vec3 ox = floor(x_ + 0.5);
    vec3 a0 = x_ - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv * uScale;
    float t = uTime * uSpeed;

    float n1 = snoise(uv * 1.0 + t * 0.3);
    float n2 = snoise(uv * 2.0 - t * 0.2);
    float n3 = snoise(uv * 3.0 + t * 0.5);

    float plasma = (n1 + n2 * 0.5 + n3 * 0.25) / 1.75;
    plasma = plasma * 0.5 + 0.5;

    vec3 col = uColor * plasma;
    col += uColor * 0.3 * smoothstep(0.4, 0.8, plasma);

    gl_FragColor = vec4(col, plasma * 0.8);
  }
`;

export default function PlasmaBackground({
  color = "#9146FF",
  speed = 0.3,
  scale = 2.0,
  opacity = 0.15,
  className,
}: PlasmaBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Skip on mobile
    if (window.innerWidth < 768) return;

    // Skip if reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let animationId: number;
    let isVisible = true;

    // Dynamically import OGL to avoid SSR issues
    const initPlasma = async () => {
      const { Renderer, Program, Mesh, Triangle } = await import("ogl");

      const renderer = new Renderer({
        alpha: true,
        antialias: false,
        dpr: Math.min(window.devicePixelRatio, 1.5),
      });
      const gl = renderer.gl;
      container.appendChild(gl.canvas);
      gl.canvas.style.position = "absolute";
      gl.canvas.style.inset = "0";
      gl.canvas.style.width = "100%";
      gl.canvas.style.height = "100%";
      gl.canvas.style.opacity = String(opacity);

      gl.clearColor(0, 0, 0, 0);

      const rgb = hexToRgb(color);

      const geometry = new Triangle(gl);

      const program = new Program(gl, {
        vertex: vertexShader,
        fragment: fragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: rgb },
          uSpeed: { value: speed },
          uScale: { value: scale },
        },
        transparent: true,
        depthTest: false,
        depthWrite: false,
      });

      const mesh = new Mesh(gl, { geometry, program });

      const resize = () => {
        if (!container) return;
        const { width, height } = container.getBoundingClientRect();
        renderer.setSize(width, height);
      };
      resize();
      window.addEventListener("resize", resize);

      let startTime = performance.now();

      const update = () => {
        if (!isVisible) {
          animationId = requestAnimationFrame(update);
          return;
        }
        program.uniforms.uTime.value = (performance.now() - startTime) / 1000;
        renderer.render({ scene: mesh });
        animationId = requestAnimationFrame(update);
      };

      animationId = requestAnimationFrame(update);

      // IntersectionObserver to pause when off-screen
      const observer = new IntersectionObserver(
        ([entry]) => {
          isVisible = entry.isIntersecting;
        },
        { threshold: 0 }
      );
      observer.observe(container);

      return () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener("resize", resize);
        observer.disconnect();
        if (gl.canvas.parentNode) {
          gl.canvas.parentNode.removeChild(gl.canvas);
        }
        gl.getExtension("WEBGL_lose_context")?.loseContext();
      };
    };

    let cleanup: (() => void) | undefined;
    initPlasma().then((fn) => {
      cleanup = fn;
    });

    return () => {
      cleanup?.();
    };
  }, [color, speed, scale, opacity]);

  return (
    <div
      ref={containerRef}
      className={className ?? "relative w-full h-full overflow-hidden"}
    />
  );
}

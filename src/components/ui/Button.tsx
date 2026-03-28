import { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "lime" | "surface" | "ghost";
  children: ReactNode;
  className?: string;
}

export default function Button({ variant = "primary", children, className = "", ...props }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 px-6 py-3 font-headline font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer text-sm";

  const variants = {
    primary:
      "grainy-gradient-primary text-on-primary shadow-[0_20px_40px_-15px_rgba(224,141,255,0.4)] hover:translate-y-[-4px]",
    secondary:
      "border border-secondary/20 text-secondary hover:bg-secondary/10",
    lime:
      "bg-secondary text-on-secondary hover:shadow-[0_0_30px_rgba(195,244,0,0.4)]",
    surface:
      "bg-surface-container-highest text-white border border-outline-variant/20 hover:border-white/40",
    ghost:
      "text-tertiary hover:text-white bg-transparent",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

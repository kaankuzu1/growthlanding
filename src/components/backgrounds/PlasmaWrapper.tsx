"use client";

import dynamic from "next/dynamic";

const PlasmaBackground = dynamic(() => import("./PlasmaBackground"), {
  ssr: false,
});

export default function PlasmaWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative bg-[#0E0E10]">
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ isolation: "isolate" }}
      >
        <PlasmaBackground color="#9146FF" speed={0.3} opacity={0.15} />
      </div>
      {/* Top/bottom gradient fade masks */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0E0E10] to-transparent z-[1] pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0E0E10] to-transparent z-[1] pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

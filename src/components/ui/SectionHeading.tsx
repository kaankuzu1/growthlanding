interface SectionHeadingProps {
  heading: string;
  headingAccent?: string;
  accentColor?: "primary" | "secondary";
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeading({
  heading,
  headingAccent,
  accentColor = "primary",
  subtitle,
  centered = false,
}: SectionHeadingProps) {
  const colorClass = accentColor === "secondary" ? "text-secondary" : "text-primary";

  const renderedHeading = headingAccent
    ? (() => {
        const idx = heading.indexOf(headingAccent);
        if (idx === -1) return heading;
        const before = heading.slice(0, idx);
        const after = heading.slice(idx + headingAccent.length);
        return (
          <>
            {before}
            <span className={colorClass}>{headingAccent}</span>
            {after}
          </>
        );
      })()
    : heading;

  return (
    <div className={`${centered ? "text-center" : ""} mb-12`}>
      <h2 className="text-4xl md:text-5xl font-headline font-black uppercase tracking-tighter text-white">
        {renderedHeading}
      </h2>
      {subtitle && (
        <p className="mt-6 text-lg text-on-surface-variant max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}

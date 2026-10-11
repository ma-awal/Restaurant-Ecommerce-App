export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  tone = "light",
  lines = false,
  className = "",
}) {
  const titleColor = tone === "dark" ? "text-white" : "text-ink";
  const subColor = tone === "dark" ? "text-white/80" : "text-slate-600";
  const alignment =
    align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`flex flex-col ${alignment} ${className}`}>
      {eyebrow && (
        <p className="font-display text-xl font-semibold uppercase tracking-[0.12em] text-brand">
          {eyebrow}
        </p>
      )}
      <div className="flex items-center gap-4">
        {lines && (
          <span className="hidden h-0.5 w-10 bg-brand sm:block sm:w-14" />
        )}
        <h2
          className={`font-display text-2xl font-semibold uppercase tracking-wide sm:text-3xl md:text-4xl ${titleColor}`}
        >
          {title}
        </h2>
        {lines && (
          <span className="hidden h-0.5 w-10 bg-brand sm:block sm:w-14" />
        )}
      </div>
      {subtitle && <p className={`mt-1 text-lg ${subColor}`}>{subtitle}</p>}
    </div>
  );
}

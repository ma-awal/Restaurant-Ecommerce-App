import Link from "next/link";

const variants = {
  primary: "bg-brand text-white hover:bg-brand-dark hover:shadow-glow",
  outline: "border-2 border-white/90 text-white hover:bg-white hover:text-ink",
  dark: "bg-ink text-white hover:bg-ink-700",
  soft: "bg-white/10 text-white hover:bg-brand",
};

const sizes = {
  xs: "px-3.5 py-1.5 text-xs",
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-[16px]",
};

export default function Button({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all duration-300 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

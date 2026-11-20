import React from "react";

export type ButtonBaseProps = {
  variant?: "primary" | "dark" | "outline" | "dark-outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  withArrow?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
};

export type ButtonProps = ButtonBaseProps &
  (
    | (React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined })
    | (React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string })
  );

export function Button({
  variant = "primary",
  size = "md",
  disabled = false,
  icon,
  iconPosition = "right",
  withArrow = false,
  children,
  className = "",
  href,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";

  const sizeStyles = {
    sm: "px-4 py-2 text-xs gap-2",
    md: "px-5 py-2.5 text-sm gap-2.5 shadow-sm hover:shadow",
    lg: "px-7 py-3.5 text-sm font-semibold tracking-wide gap-3 shadow-md hover:shadow-lg",
  }[size];

  const variantStyles = {
    primary:
      "text-white bg-[#2563EB] hover:bg-[#1D4ED8] shadow-blue-500/20",
    dark:
      "text-white bg-[#09090B] hover:bg-[#18181B] shadow-black/10",
    outline:
      "text-neutral-800 bg-transparent border border-neutral-300 hover:border-neutral-900 hover:bg-neutral-50/50",
    "dark-outline":
      "text-white bg-transparent border border-white/20 hover:border-white/60 hover:bg-white/5",
    ghost:
      "text-neutral-600 hover:text-black bg-transparent hover:bg-neutral-100/60",
  }[variant];

  const arrowIcon = withArrow ? (
    <svg
      className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  ) : null;

  const combinedClass = `group ${baseStyles} ${sizeStyles} ${variantStyles} ${className}`.trim();

  const content = (
    <>
      {icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span className="shrink-0">{icon}</span>}
      {arrowIcon && <span className="shrink-0">{arrowIcon}</span>}
    </>
  );

  if (href) {
    const anchorProps = props as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a href={href} className={combinedClass} {...anchorProps}>
        {content}
      </a>
    );
  }

  const buttonProps = props as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button disabled={disabled} className={combinedClass} {...buttonProps}>
      {content}
    </button>
  );
}

export default Button;

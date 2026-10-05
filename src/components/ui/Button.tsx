import Link from 'next/link';
import type { Route } from 'next';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

const variants: Record<Variant, string> = {
  primary:
    'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] focus-visible:ring-[var(--color-primary)]',
  outline:
    'border border-[var(--color-border)] bg-transparent text-[var(--color-foreground)] hover:bg-[var(--color-muted)]',
  ghost:
    'bg-transparent text-[var(--color-foreground)] hover:bg-[var(--color-muted)]',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-10 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  className,
  onClick,
  type = 'button',
  disabled,
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href && !disabled) {
    return (
      <Link href={href as Route} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}

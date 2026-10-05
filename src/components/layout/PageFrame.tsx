import type { ReactNode } from 'react';
import { VerticalGuides } from '@/components/layout/VerticalGuides';

interface PageFrameProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  showGuides?: boolean;
}

interface InnerGuideContentProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

export default function PageFrame({
  children,
  className = '',
  contentClassName = '',
  showGuides = true,
}: PageFrameProps) {
  return (
    <div className={`relative w-full ${className}`}>
      {showGuides && <VerticalGuides />}
      <div className={`relative z-10 ${contentClassName}`}>{children}</div>
    </div>
  );
}

/** Places content strictly between the two vertical guides. */
export function InnerGuideContent({
  children,
  className = '',
  contentClassName = '',
}: InnerGuideContentProps) {
  return (
    <div
      className={`mx-auto w-full max-w-[160rem] md:grid md:grid-cols-[6.5625%_1px_minmax(0,1fr)_1px_6.5625%] ${className}`}
    >
      <div className={`min-w-0 md:col-start-3 ${contentClassName}`}>
        {children}
      </div>
    </div>
  );
}

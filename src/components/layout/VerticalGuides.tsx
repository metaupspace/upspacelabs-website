interface VerticalGuidesProps {
  className?: string;
}

export function VerticalGuides({ className = '' }: VerticalGuidesProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 top-[5.375rem] -bottom-5 z-20 hidden overflow-x-clip md:block ${className}`}
    >
      <div className="relative mx-auto h-full w-full max-w-(--frame)">
        <span className="absolute inset-y-0 left-[6.5625%] w-px bg-[#E5E5E5] dark:bg-[#404040]" />
        <span className="absolute inset-y-0 right-[6.5625%] w-px bg-[#E5E5E5] dark:bg-[#404040]" />
      </div>
    </div>
  );
}

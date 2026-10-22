export const Titlebar = () => {
  return (
    <header
      data-tauri-drag-region
      className="relative isolate z-[1100] flex h-8 shrink-0 items-center gap-1 overflow-hidden border-b border-black/5 bg-white/80 pl-[max(8px,var(--tauri-plugin-decoration-left-clearance,0px))] pr-[max(8px,var(--tauri-plugin-decoration-right-clearance,0px))] select-none backdrop-blur-md dark:border-white/10 dark:bg-neutral-900/80"
    >
      <img src="/logo.png" className="h-full w-auto object-contain" />
      <span
        data-tauri-drag-region
        className="pointer-events-none text-[13px] font-semibold tracking-wide text-neutral-700 dark:text-neutral-200"
      >
        Meta
      </span>
    </header>
  );
};

import { memo } from "react";

/**
 * 标题栏不接收任何 props，并冻结在 memo 里：
 * App / 页面里的任何 state 变化都不会让它重新渲染。
 * 布局上它是 flow 中的独立一行，main 是它下方独立的滚动容器，
 * 二者不共享滚动区域，main 的内容永远画不到这里来。
 */
export const Titlebar = memo(function Titlebar() {
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
});

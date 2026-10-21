import { useEffect, useState } from "react";

const imageModules = import.meta.glob<{ default: string }>("@/assets/figure/*.png");

export const Empty = () => {
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    const paths = Object.keys(imageModules);
    const path = paths[Math.floor(Math.random() * paths.length)];
    let cancelled = false;
    imageModules[path]().then((m) => {
      if (!cancelled) setUrl(m.default);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-center overflow-hidden">
      {/* 中间这一层用 min-h-0 + flex-1 得到确定的可用高度，
          图片用 max-h-full/max-w-full 只缩小、不放大，文字始终占一行。 */}
      <div className="flex min-h-0 w-full flex-1 items-center justify-center">
        <img src={url} className="max-h-full max-w-full object-contain" />
      </div>
      <span className="shrink-0">装修中...</span>
    </div>
  );
};

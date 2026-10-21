import "@/assets/loader.css";
import { HTMLAttributes } from "react";
import { cn } from "tailwind-variants";

interface SpriteProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}
export const Sprite = ({ className }: SpriteProps) => {
  return (
    <div className={cn("loader", className)}>
      <div className="loader-strip"></div>
    </div>
  );
};

import {
  Sidebar as SharkSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Icon } from "@iconify/react";
import { HTMLAttributes } from "react";
import { cn } from "tailwind-variants";

interface SidebarProps extends HTMLAttributes<HTMLDivElement> {
    className?: string
}

export const Sidebar = ({className}: SidebarProps) => {
  return (
    <SharkSidebar className={cn(className)}>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <span>Select workspace</span>
              <Icon icon="codicon:chevron-down" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </SharkSidebar>
  );
};

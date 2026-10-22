import {
    Sidebar as SharkSidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Icon } from "@iconify/react";
import { Link, StaticDataRouteOption, useLocation, useRouter } from "@tanstack/react-router";
import { HTMLAttributes } from "react";
import { cn } from "tailwind-variants";

interface SidebarProps extends HTMLAttributes<HTMLDivElement> {
    className?: string
}

interface RouteArr {
    fullPath: string
    options: {
        staticData?: StaticDataRouteOption
    }
}

const FOOTER = 'footer'

export const Sidebar = ({ className }: SidebarProps) => {
    const router = useRouter()
    const routes: RouteArr[] = Object.values(router.routesById)
    const groups = routes.reduce<Record<string, RouteArr[]>>((acc, route) => {
        let g = route.options.staticData?.group
        if (g) (acc[g] ??= []).push(route)
        return acc
    }, {})
    const contentGroups = Object.keys(groups).filter((g) => g != FOOTER)
    const footerRoutes = groups[FOOTER] ?? []
    const { pathname } = useLocation()

    return (
        <SharkSidebar className={cn(className)}>
            <SidebarContent>
                {contentGroups.map((g) => (
                    <SidebarGroup key={g}>
                        <SidebarGroupLabel>{g}</SidebarGroupLabel>
                        <SidebarMenu>
                            {groups[g].map((route) => (
                                <SidebarMenuItem key={route.fullPath} value={route.fullPath}>
                                    <SidebarMenuButton asChild isActive={pathname === route.fullPath}>
                                        <Link to={route.fullPath}>
                                            <Icon icon={route.options.staticData?.icon} />
                                            {route.options.staticData?.label}
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroup>
                ))}
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter >
                <SidebarMenu>
                    {footerRoutes.map((route) => (
                        <SidebarMenuItem key={route.fullPath}>
                            <SidebarMenuButton asChild isActive={pathname === route.fullPath}>
                                <Link to={route.fullPath}>
                                    <Icon icon={route.options.staticData?.icon} />
                                    {route.options.staticData?.label}
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarFooter>
        </SharkSidebar>
    );
};

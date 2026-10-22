import { invoke } from "@tauri-apps/api/core";
import "./app.css";
import { Titlebar } from "@/components/titlebar";
import { Sidebar } from "@/components/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet, useRouter } from "@tanstack/react-router";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

function App() {
    const router = useRouter()

    // 必须等 React 挂载之后再激活：
    // 模块顶层调用会和插件的文档 boot/ready 握手抢跑，
    // 一旦握手错过，该文档后续每次 activate_decoration() 都会 5s 超时。
    useEffect(() => {
        void invoke("show_window");
    }, [])
    return (
        <SidebarProvider defaultOpen={false} className="flex flex-col h-svh min-h-0 w-full">
            <Titlebar />
            <div className="relative flex flex-1 flex-row min-h-0">
                <Sidebar className="absolute h-full" />
                <main className="flex flex-1 min-h-0 flex-col">
                    <ScrollArea className="h-full">
                        <Outlet />
                        <TanStackDevtools
                            plugins={[
                                {
                                    name: "TanStack Router",
                                    render: <TanStackRouterDevtoolsPanel router={router} />
                                }
                            ]}
                        />
                    </ScrollArea>
                </main>
            </div>
            <footer className="flex z-11 h-7 shrink-0 border-t">
                <SidebarTrigger />
            </footer>
        </SidebarProvider>
    );
}

export default App;

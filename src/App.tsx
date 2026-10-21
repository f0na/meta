import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import { convertFileSrc } from "@tauri-apps/api/core";
import { Empty } from "./components/empty";
import { Titlebar } from "@/components/titlebar";
import { Sidebar } from "@/components/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const href = convertFileSrc("controls.css", "tauri-plugin-decoration");
document.documentElement.style.setProperty("--tauri-plugin-decoration-ready", "ready");
const link = document.createElement("link");
link.rel = "stylesheet";
link.href = href;
link.setAttribute("data-tauri-plugin-decoration-stylesheet", "v1");
document.head.appendChild(link);

invoke("show_window");

function App() {
  return (
    <SidebarProvider defaultOpen={false} className="flex flex-col h-svh min-h-0 w-full">
      <Titlebar />
      <div className="relative flex flex-1 flex-row min-h-0">
        <Sidebar className="absolute h-full" />
        <main className="flex flex-1 min-h-0 flex-col">
          <Empty />
        </main>
      </div>
      <footer className="flex z-11 h-7 shrink-0 border-t">
        <SidebarTrigger />
      </footer>
    </SidebarProvider>
  );
}

export default App;

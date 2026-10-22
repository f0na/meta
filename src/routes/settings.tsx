import { SettingsPage } from "@/pages/settings";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/settings")({
    component: SettingsPage,
    staticData: {
        label: "设置",
        group: "footer",
        icon: "codicon:gear-compact"
    },
});
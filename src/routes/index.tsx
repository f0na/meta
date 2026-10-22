import { ControlRoomPage } from "@/pages/control-room";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
    component: ControlRoomPage,
    staticData: {
        label: "管制室",
        group: "迦勒底",
        icon: "codicon:layout-density-compact"
    },
});

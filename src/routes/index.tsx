import { ControlRoomPage } from "@/pages/control-room";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: ControlRoomPage,
});

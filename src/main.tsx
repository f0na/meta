import React from "react";
import ReactDOM from "react-dom/client";
import "@/assets/controls.css";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "@/routeTree.gen";
import { ThemeProvider } from '@lacspace/theme';
import { get_theme } from "@/api/settings";

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

const theme_obj = await get_theme()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <ThemeProvider defaultTheme={theme_obj.theme}>
            <RouterProvider router={router} />
        </ThemeProvider>
    </React.StrictMode>,
);

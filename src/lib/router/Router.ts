import { Fragment } from "../components/Fragment";
import { View } from "../core/View";
import { AppState } from "../state/decorator";
import { Route } from "./Route";

/**
 * A declarative component that manages navigation and route rendering.
 */
export class Router extends View {
    @AppState private currentPath: string = window.location.pathname;
    private routes: Route[];

    public constructor(routes: Route[]) {
        super();
        this.routes = routes;

        // Listen for history changes (back/forward)
        window.addEventListener("popstate", () => {
            this.currentPath = window.location.pathname;
        });

        // Listen for internal navigation events
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        window.addEventListener("flow-navigate" as any, (e: CustomEvent) => {
            this.currentPath = e.detail.path;
        });
    }

    public static navigate(path: string): void {
        window.history.pushState({}, "", path);
        window.dispatchEvent(new CustomEvent("flow-navigate", { detail: { path } }));
    }

    public render(): View {
        const route = this.routes.find(r => r.path === this.currentPath);

        if (route) {
            return route.builder();
        }

        // Fallback or 404
        return new Fragment([]);
    }
}

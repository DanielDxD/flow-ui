import { beforeEach, describe, expect, it } from "vitest";
import { View } from "../core/View";
import { Route } from "./Route";
import { Router } from "./Router";

class HomeView extends View {
    public render() {
        const el = document.createElement("div");
        el.id = "home";
        el.textContent = "Home";
        return el;
    }
}

class LoginView extends View {
    public render() {
        const el = document.createElement("div");
        el.id = "login";
        el.textContent = "Login";
        return el;
    }
}

describe("Router", () => {
    beforeEach(() => {
        // Reset URL before each test
        window.history.pushState({}, "", "/");
    });

    it("should render the matching route", () => {
        const routes = [
            new Route("/", () => new HomeView()),
            new Route("/login", () => new LoginView())
        ];

        const router = new Router(routes);
        const el = router.build();

        expect(el.id).toBe("home");
        expect(el.textContent).toBe("Home");
    });

    it("should update when navigation occurs", () => {
        const routes = [
            new Route("/", () => new HomeView()),
            new Route("/login", () => new LoginView())
        ];

        const router = new Router(routes);
        const el = router.build();
        document.body.appendChild(el);

        expect(document.getElementById("home")).not.toBeNull();

        Router.navigate("/login");

        expect(window.location.pathname).toBe("/login");
        expect(document.getElementById("login")).not.toBeNull();
        expect(document.getElementById("home")).toBeNull();
    });

    it("should handle back/forward buttons (popstate)", () => {
        const routes = [
            new Route("/", () => new HomeView()),
            new Route("/login", () => new LoginView())
        ];

        const router = new Router(routes);
        const el = router.build();
        document.body.appendChild(el);

        Router.navigate("/login");
        expect(document.getElementById("login")).not.toBeNull();

        // Simulate back button
        window.history.pushState({}, "", "/");
        window.dispatchEvent(new PopStateEvent("popstate"));

        expect(document.getElementById("home")).not.toBeNull();
    });
});

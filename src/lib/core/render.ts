import { View } from "./View";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Constructor<T> = new (...args: any[]) => T;

/**
 * Render HTML via JavaScript using the SwiftUI-like View tree.
 * @param elementId The ID of the DOM element to mount the HTML to
 * @param view      The root View instance to render
 */
export function render(elementId: string, view: View): void {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = ""; // Clear existing content
        element.appendChild(view.build());
    } else {
        console.error(`Element with id "${elementId}" not found.`);
    }
}

/**
 * Instantiates the root View class and mounts it to the DOM.
 * @param elementId The ID of the DOM element to mount the HTML to
 * @param ViewClass The root View class to instantiate
 */
export function bootstrap<T extends View>(
    elementId: string,
    ViewClass: Constructor<T>
): void {
    render(elementId, new ViewClass());
}

# Flow UI: AI Framework Guide

Flow UI is a lightweight, declarative, SwiftUI-inspired UI framework for the web, built with TypeScript. It uses a **Granular Rebuild System** to minimize DOM updates and maximize performance.

## Core Concepts

### 1. Everything is a `View`

Every component must extend the base `View` class and implement the `render()` method.

- `render()` can return a single `View` (composition) or a raw `HTMLElement`.
- Use `build()` to convert a `View` into a real DOM node (usually handled by the framework or parent containers).

### 2. State Management

Reactivity is property-based, powered by ES6 Proxies.

- **`@AppState`**: Makes a property reactive. When its value changes, the `View` automatically calls `rebuild()`, replacing its DOM node in-place.
- **`@ObservedObject`**: Used on a `View` property to observe an external object (ViewModel).
- **ViewModels**: Any class can serve as a ViewModel. Only properties decorated with `@AppState` inside the ViewModel will trigger a re-render of the observing `View`.

### 3. Layout System (Flexbox-based)

- **`VStack`**: Vertical stack (column).
- **`HStack`**: Horizontal stack (row).
- **`Container`**: Wraps a single child.
- **`Fragment`**: Transparent wrapper (`display: contents`) that groups children without affecting layout.

### 4. Modifiers

Views are styled and configured using a chainable API:

```typescript
new Text("Hello")
    .fontSize(20)
    .fontWeight("bold")
    .color("#3b82f6")
    .padding(10)
    .onTap(() => console.log("Clicked!"));
```

## Logic & Lists

### Conditional Rendering (`If`)

```typescript
new If(this.isLoggedIn, new Text("Welcome back!"), new Text("Please sign in"));
```

### List Rendering (`ForEach`)

Always provide a unique key for performance and state preservation (like input focus/scroll).

```typescript
new ForEach(
    this.items,
    (item) => new ListItemView(item),
    (item) => item.id, // Key selector
);
```

## Performance & State Preservation

Flow UI automatically preserves:

1. **Focus**: If an element with an `id` had focus before a rebuild, it will regain focus after the DOM update.
2. **Cursor Position**: Input selections and cursor positions are restored after re-renders.
3. **DOM Nodes (with Keys)**: `ForEach` with keys reuses existing `View` instances and DOM nodes instead of recreating them.

## Best Practices for AI

1. **Prefer ViewModels**: For complex logic, use a separate class with `@AppState` and observe it in the `View` using `@ObservedObject`.
2. **Use Semantic Components**: Use `TextRole`, `Button`, and Form components instead of raw HTML when possible.
3. **Colocate Styling**: Use the modifier chain (`.padding()`, `.cornerRadius()`, etc.) instead of external CSS for component-specific styles.
4. **Lifecycle Hooks**: Use `onAppear()` and `onDisappear()` for side effects like API calls or timers.

## Example: Counter App (ViewModel Pattern)

```typescript
class CounterViewModel {
    @AppState public count = 0;
    public increment() {
        this.count++;
    }
}

class CounterView extends View {
    @ObservedObject private vm = new CounterViewModel();

    public render() {
        return new VStack([
            new Text(`Count: ${this.vm.count}`).fontSize(24),
            new Button("Increment", () => this.vm.increment())
                .backgroundColor("blue")
                .color("white"),
        ]).spacing(10);
    }
}

bootstrap("app", CounterView);
```

## Routing System

Flow UI provides a declarative routing system using the browser's History API.

### 1. `Route`

Defines a mapping between a path and a View builder.

```typescript
new Route("/login", () => new LoginView());
```

### 2. `Router`

A component that renders the View matching the current URL path.

```typescript
new Router([
    new Route("/", () => new HomeView()),
    new Route("/login", () => new LoginView()),
    new Route("/profile", () => new ProfileView()),
]);
```

### 3. `Link`

A component for internal navigation without full page reloads.

```typescript
new Link("/login", "Go to Login");
```

### Manual Navigation

You can also navigate programmatically:

```typescript
Router.navigate("/home");
```

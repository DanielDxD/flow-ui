# Flow UI

A lightweight, declarative, SwiftUI-inspired UI framework for the web. Built with TypeScript and focused on visual excellence and developer experience.

## Table of Contents
- [Core Philosophy](#core-philosophy)
- [How it Works](#how-it-works)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [State Management](#state-management)
- [Layout System](#layout-system)
- [Components Reference](#components-reference)
- [Lifecycle Hooks](#lifecycle-hooks)
- [Form Components](#form-components)

## Core Philosophy
Flow UI brings the declarative power of modern mobile frameworks like SwiftUI to the web. It minimizes boilerplates, avoids heavy virtual DOM diffing where possible, and focuses on a clean, chainable API that makes UI code look like the layout it represents.

## How it Works
At its heart, Every component in Flow UI is a `View`. Unlike frameworks that re-render based on a global state tree diff, Flow UI uses a **Granular Rebuild System**:
1. **State Tracking**: The `@AppState` and `@AppStorage` decorators wrap your class properties in a Reactive Proxy.
2. **Subscription**: When a `View` is instantiated, it automatically subscribes to any decorated state properties it contains.
3. **In-place Rebuild**: When a state property changes, only the specific `View` owning that state is rebuilt. The framework replaces the DOM node in-place, preserving parent-child relationships.
4. **Focus Restoration**: To ensure a smooth typing experience, Flow UI tracks the `activeElement` and cursor position, restoring them automatically after a rebuild.

## Installation

```bash
npm install flow-ui
```

## Quick Start

```typescript
import { View, VStack, Text, Button, AppState, bootstrap } from "flow-ui";

class MyView extends View {
    @AppState private count = 0;

    public render() {
        return new VStack([
            new Text(`Count: ${this.count}`)
                .fontSize(24)
                .fontWeight("bold"),
            new Button("Increment", () => this.count++)
                .backgroundColor("#3b82f6")
                .color("white")
                .padding("8px 16px")
                .cornerRadius(8)
        ])
        .spacing(10)
        .padding(20);
    }
}

bootstrap("app", MyView);
```

## State Management

### `@AppState`
The most common way to manage state. It makes a property reactive. When updated, the `render()` method is called and the DOM is updated.

### `@AppStorage(key)`
Extends `@AppState` by automatically persisting the value to `localStorage`.
- **Auto-Sync**: Any change to the property is immediately saved to the browser.
- **Deep Reactivity**: Works with objects and arrays.
- **Auto-Parsing**: Handles `JSON.parse` and `JSON.stringify` automatically.

### `@SessionStorage(key)`
Same as `@AppStorage`, but uses `sessionStorage`, persisting only for the current tab session.

## Layout System

Flow UI uses a Flexbox-based layout system that is intuitive and powerful.

- **`VStack`**: Vertical Stack. Arranges children in a column.
- **`HStack`**: Horizontal Stack. Arranges children in a row.
- **`Container`**: A generic wrapper for a single child.
- **`Fragment`**: A transparent container (`display: contents`) to group elements without adding DOM nodes.

### Alignment & Spacing
```typescript
new VStack([ ... ])
    .spacing(10)
    .alignItems(Alignment.Center)
    .justifyContent(JustifyContent.SpaceBetween)
```

## Components Reference

### `Text`
Standard text component.
- `.fontSize(number|string)`
- `.fontWeight(string|number)`
- `.color(string)`

### `Button`
Interactive button.
- `.disabled(boolean)`
- `.onTap((e) => void)`

### `If`
Conditional rendering.
```typescript
new If(this.isVisible, 
    new Text("I am visible"),
    new Text("I am the fallback") // Optional
)
```

### `ForEach`
List rendering.
```typescript
new ForEach(this.items, (item) => new Text(item))
```

## Lifecycle Hooks

Flow UI provides easy access to DOM mount/unmount events:

- **`onAppear(() => void)`**: Triggered when the component is inserted into the DOM.
- **`onDisappear(() => void)`**: Triggered when the component is removed from the DOM.

## Form Components

Flow UI includes a suite of components designed for building forms with minimal state glue.

- **`Form`**: Wraps elements and handles submission.
- **`TextField`**: Text input with focus restoration.
- **`SelectField`**: Dropdown selection.
- **`Checkbox`**: Standard toggle.
- **`SwitchInput`**: Stylized toggle switch.
- **`RadioInput`**: Grouped single selection.

```typescript
new Form([
    new TextField("Username", this.username, (val) => this.username = val),
    new SwitchInput("Dark Mode", this.isDark, (val) => this.isDark = val)
])
```

## License
MIT

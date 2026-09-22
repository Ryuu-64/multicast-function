# multicast-function

Call multiple subscribed functions in registration order, with the same arguments. Useful for events with multiple subscribers.

[简体中文](https://github.com/Ryuu-64/multicast-function/blob/main/readme/README.zh-cn.md) · [Repository](https://github.com/Ryuu-64/multicast-function) · [npm](https://www.npmjs.com/package/multicast-function)

## Installation and usage

```sh
npm install multicast-function
# or the same code under the @ryuu-64 scope:
npm install @ryuu-64/multicast-function
```

Both names are published at the same version. With the scoped package, use `@ryuu-64/multicast-function` instead of `multicast-function` in the imports below.

TypeScript (type declarations are included):

```typescript
import { MulticastFunction } from 'multicast-function';

const callbacks = new MulticastFunction<(value: number) => number>();
const increment = (value: number) => value + 1;
const double = (value: number) => value * 2;

callbacks.add(increment); // true
callbacks.add(double); // true
console.log(callbacks.length); // 2
console.log(callbacks.invoke(3)); // 6 (the last callback's result)
callbacks.remove(double); // true
console.log(callbacks.invoke(3)); // 4
callbacks.clear();
console.log(callbacks.invoke(3)); // undefined
```

JavaScript with CommonJS (save as `example.cjs`, then run `node example.cjs`):

```javascript
const { MulticastFunction } = require('multicast-function');

const callbacks = new MulticastFunction();
callbacks.add((name) => `Hello, ${name}!`);
console.log(callbacks.invoke('Ada')); // Hello, Ada!
```

## API

`new MulticastFunction<T>()` takes no arguments and creates an empty subscription list. `T` is the callback function type; it determines the allowed arguments and return type. Keep callback references when you need to remove or compare subscriptions: identical function bodies do not make two function objects equal.

### `add(func: T | MulticastFunction<T>): boolean`

- Appends a callback, or copies another multicast's current callbacks in their existing order. Later changes to that other multicast do not change this list.
- Duplicates are allowed: adding the same callback twice registers two calls. Adding this multicast to itself duplicates its current list once.
- Returns `true` if at least one subscription was added. Adding an empty multicast returns `false` and changes nothing.
- At runtime, `null` and `undefined` return `false` without changing the list.

### `remove(func: T | MulticastFunction<T>): boolean`

- For a callback, removes only its last occurrence, using function reference identity.
- For a multicast, removes only the last matching **contiguous sequence** of its current callbacks. Order and duplicates must match. For example, removing `[a, b]` from `[a, b, a, a, b]` leaves `[a, b, a]`.
- Returns `true` if subscriptions were removed; returns `false` without changes if there is no match, the input multicast is empty, or the input is `null` or `undefined` at runtime. Removing from an empty list returns `false`.
- Removing a non-empty multicast from itself clears its list and returns `true`.

### `invoke(...args: Parameters<T>): ReturnType<T> | undefined`

- Calls each subscribed callback synchronously in registration order, passing the same arguments to every callback. Duplicates are called once per subscription.
- Returns the last callback's result, including `undefined` if that callback returns it. An empty list returns `undefined` without calling anything.
- Takes a snapshot of the subscription list at the start of each call. Adding, removing (including self-removal), or clearing during a callback changes the live list immediately, but leaves the current invocation's snapshot unchanged. Removed callbacks still run in this invocation; added callbacks start with a later invocation. A nested `invoke()` takes a new snapshot of the then-current list.
- A synchronous exception propagates to the caller immediately and stops the remaining callbacks in that invocation. Subscription changes made before the exception are retained.
- Promises are not awaited or combined. With async callbacks, invocation returns the last callback's promise; promise rejections do not synchronously stop the remaining callbacks.

### `clear(): void`

Takes no arguments and removes all subscriptions. Returns `undefined` (`void` in TypeScript). Clearing an empty list is harmless. During an invocation, the current snapshot still runs unless a callback throws.

### `equals(multicastFunction: MulticastFunction<T>): boolean`

Compares the current subscription lists by length and function reference at each position. Order and duplicates matter; two empty multicasts compare equal. Comparing a multicast with itself returns `true`. Returns `false` for a different list, or for `null` or `undefined` at runtime. Does not invoke any callbacks or change either list.

### `length: number` (read-only)

The current number of subscriptions, including duplicates; `0` for an empty list. Read as a property, not a method. It reflects subscription changes immediately, even during an invocation that is still using an earlier snapshot.

The TypeScript signatures for `add`, `remove`, and `equals` do not accept `null` or `undefined` with `strictNullChecks` enabled; their runtime handling is described above for JavaScript callers. Other values outside the declared parameter types are unsupported.

For more examples, see the [unit tests](https://github.com/Ryuu-64/multicast-function/blob/main/tests/multicast-function.test.ts).

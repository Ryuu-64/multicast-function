# multicast-function

## What is it

Multicast function

## Where to use

Functions are the foundation of events, and events can have multiple subscribers, hence the need for multicast functions.

## How to use

```typescript
const multicastFunction = new MulticastFunction<() => void>();
const func = () => {
};
multicastFunction.add(func);
multicastFunction.invoke();
```

For more examples, please refer to the [unit tests](https://github.com/Ryuu-64/multicast-function/blob/main/tests/multicast-function.test.ts).


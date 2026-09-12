# multicast-function

按注册顺序调用多个已订阅的函数，并向它们传入相同的参数。适用于有多个订阅者的事件。

[English](https://github.com/Ryuu-64/multicast-function/blob/main/README.md) · [代码仓库](https://github.com/Ryuu-64/multicast-function) · [npm](https://www.npmjs.com/package/multicast-function)

## 安装与使用

```sh
npm install multicast-function
```

TypeScript（包中已包含类型声明）：

```typescript
import { MulticastFunction } from 'multicast-function';

const callbacks = new MulticastFunction<(value: number) => number>();
const increment = (value: number) => value + 1;
const double = (value: number) => value * 2;

callbacks.add(increment); // true
callbacks.add(double); // true
console.log(callbacks.length); // 2
console.log(callbacks.invoke(3)); // 6（最后一个回调的返回值）
callbacks.remove(double); // true
console.log(callbacks.invoke(3)); // 4
callbacks.clear();
console.log(callbacks.invoke(3)); // undefined
```

使用 CommonJS 的 JavaScript（保存为 `example.cjs`，然后运行 `node example.cjs`）：

```javascript
const { MulticastFunction } = require('multicast-function');

const callbacks = new MulticastFunction();
callbacks.add((name) => `Hello, ${name}!`);
console.log(callbacks.invoke('Ada')); // Hello, Ada!
```

## API

`new MulticastFunction<T>()` 不接收参数，创建一个空的订阅列表。`T` 是回调函数类型，决定可传入的参数和返回值类型。需要移除或比较订阅时，请保留回调的引用：两个函数对象即使函数体相同，也不视为相同的函数。

### `add(func: T | MulticastFunction<T>): boolean`

- 追加一个回调，或按原有顺序复制另一个多播对象当前的回调。之后修改另一个多播对象，不会改变此列表。
- 允许重复订阅：同一个回调添加两次就会被调用两次。将多播对象添加到自身，会把当前列表再复制一遍。
- 至少添加了一个订阅时返回 `true`。添加空多播对象时返回 `false`，列表不变。
- 运行时传入 `null` 或 `undefined` 会返回 `false`，列表不变。

### `remove(func: T | MulticastFunction<T>): boolean`

- 传入回调时，按函数引用匹配，只移除最后一次出现的订阅。
- 传入多播对象时，用它当前的回调列表匹配，只移除最后一个匹配的**连续序列**。顺序和重复次数都必须一致。例如，从 `[a, b, a, a, b]` 中移除 `[a, b]` 后，剩下 `[a, b, a]`。
- 移除了订阅时返回 `true`；没有匹配项、传入空多播对象，或运行时传入 `null`、`undefined` 时，返回 `false` 且不作修改。从空列表移除订阅返回 `false`。
- 将非空多播对象从自身移除，会清空列表并返回 `true`。

### `invoke(...args: Parameters<T>): ReturnType<T> | undefined`

- 按注册顺序同步调用每个已订阅的回调，向每个回调传入相同的参数。重复订阅的回调按订阅次数调用。
- 返回最后一个回调的返回值；如果该回调返回 `undefined`，结果也是 `undefined`。空列表直接返回 `undefined`，不调用任何函数。
- 每次调用开始时，都会对订阅列表生成快照。回调中添加、移除（包括移除自身）或清空订阅，会立即修改实际列表，但不会改变本次调用的快照。本次调用仍会执行被移除的回调，新增回调从后续调用开始执行。嵌套的 `invoke()` 会根据当时的实际列表生成新快照。
- 回调同步抛出的异常会立即向调用者传播，并终止本次调用中剩余的回调。抛出异常前已完成的订阅修改会保留。
- 不会等待或合并 Promise。使用异步回调时，返回最后一个回调的 Promise；Promise 拒绝不会同步终止剩余回调的执行。

### `clear(): void`

不接收参数，移除全部订阅。返回 `undefined`（TypeScript 中为 `void`）。清空空列表不会产生影响。在调用过程中清空列表，当前快照仍会继续执行，除非回调抛出异常。

### `equals(multicastFunction: MulticastFunction<T>): boolean`

比较当前订阅列表的长度，以及每个位置上的函数引用。顺序和重复次数都会影响结果；两个空多播对象相等。与自身比较返回 `true`。列表不同，或运行时传入 `null`、`undefined` 时，返回 `false`。不会调用回调，也不会修改任何一方的列表。

### `length: number`（只读）

当前订阅数量，包含重复订阅；空列表为 `0`。按属性读取，不作为方法调用。订阅发生变化时会立即更新，即使正在执行的调用仍使用之前的快照。

开启 `strictNullChecks` 时，`add`、`remove` 和 `equals` 的 TypeScript 签名不接受 `null` 或 `undefined`；上文描述的运行时处理适用于 JavaScript 调用者。不支持声明的参数类型以外的其他值。

更多示例请参阅[单元测试](https://github.com/Ryuu-64/multicast-function/blob/main/tests/multicast-function.test.ts)。

# multicast-function

## 这是什么

多播的函数

## 用在哪里

函数是事件的基础，事件可以有多个订阅者，因此需要多播函数

## 如何使用

```typescript
const multicastFunction = new MulticastFunction<() => void>();
const func = () => {
};
multicastFunction.add(func);
multicastFunction.invoke();
```

更多实例，请参考[单元测试](https://github.com/Ryuu-64/multicast-function/blob/main/tests/multicast-function.test.ts)


import {MulticastFunction} from '../src';

describe('MulticastFunction', () => {
    it('add', () => {
        const multicastFunction = new MulticastFunction<() => void>();
        const func = () => {
        };
        multicastFunction.add(func);
        expect(multicastFunction.length).toBe(1);
    });
    it('add null', () => {
        const multicastFunction = new MulticastFunction<() => void>();
        const isAdd = multicastFunction.add(null);
        expect(isAdd).toBe(false);
        expect(multicastFunction.length).toBe(0);
    });
    it('add undefined', () => {
        const multicastFunction = new MulticastFunction<() => void>();
        const isAdd = multicastFunction.add(undefined);
        expect(isAdd).toBe(false);
        expect(multicastFunction.length).toBe(0);
    });
    it('add return value', () => {
        const multicastFunction = new MulticastFunction<() => void>();
        const func = () => {
        };
        const isFuncAdd = multicastFunction.add(func);
        expect(isFuncAdd).toBe(true);

        const isNullAdd = multicastFunction.add(null);
        expect(isNullAdd).toBe(false);
    });
    it('add multicast', () => {
        const multicastFunction1 = new MulticastFunction<() => void>();
        const func = () => {
        };
        multicastFunction1.add(func);
        multicastFunction1.add(func);

        const multicastFunction2 = new MulticastFunction<() => void>();
        multicastFunction2.add(func);
        multicastFunction2.add(func);

        const isAdd = multicastFunction1.add(multicastFunction2);
        expect(isAdd).toBe(true);
        expect(multicastFunction1.length).toBe(4);
    });
    it('repeat add', () => {
        const multicastFunction = new MulticastFunction<() => void>();
        const func = () => {
        };
        multicastFunction.add(func);
        multicastFunction.add(func);
        expect(multicastFunction.length).toBe(2);
    });
    it('invoke', () => {
        let value = 0;

        const multicastFunction = new MulticastFunction<() => void>();
        const func = () => {
            value++;
        };
        multicastFunction.add(func);
        multicastFunction.invoke();
        expect(value).toBe(1);
    });
    it('invoke with no registered functions returns undefined', () => {
        const multicastFunction = new MulticastFunction<() => number>();

        expect(multicastFunction.invoke()).toBeUndefined();
    });
    it('invoke returns the result of the last registered function', () => {
        const multicastFunction = new MulticastFunction<(value: number) => number>();
        const first = jest.fn((value: number) => value + 1);
        const last = jest.fn((value: number) => value * 2);
        multicastFunction.add(first);
        multicastFunction.add(last);

        expect(multicastFunction.invoke(3)).toBe(6);
        expect(first).toHaveBeenCalledWith(3);
        expect(last).toHaveBeenCalledWith(3);
    });
    it('self-removal during invoke preserves registration order and the last result', () => {
        const multicastFunction = new MulticastFunction<() => number>();
        const calls: string[] = [];
        const first = () => {
            calls.push('first');
            multicastFunction.remove(first);
            return 1;
        };
        multicastFunction.add(first);
        multicastFunction.add(() => { calls.push('second'); return 2; });
        multicastFunction.add(() => { calls.push('third'); return 3; });

        expect(multicastFunction.invoke()).toBe(3);
        expect(calls).toEqual(['first', 'second', 'third']);
        expect(multicastFunction.length).toBe(2);
        calls.length = 0;
        expect(multicastFunction.invoke()).toBe(3);
        expect(calls).toEqual(['second', 'third']);
    });
    it('removing a later callback during invoke affects only later invocations', () => {
        const multicastFunction = new MulticastFunction<() => number>();
        const calls: string[] = [];
        const last = () => { calls.push('last'); return 2; };
        multicastFunction.add(() => {
            calls.push('first');
            multicastFunction.remove(last);
            return 1;
        });
        multicastFunction.add(last);

        expect(multicastFunction.invoke()).toBe(2);
        expect(calls).toEqual(['first', 'last']);
        expect(multicastFunction.length).toBe(1);
        calls.length = 0;
        expect(multicastFunction.invoke()).toBe(1);
        expect(calls).toEqual(['first']);
    });
    it('clear during invoke affects only later invocations', () => {
        const multicastFunction = new MulticastFunction<() => number>();
        const calls: string[] = [];
        multicastFunction.add(() => {
            calls.push('first');
            multicastFunction.clear();
            return 1;
        });
        multicastFunction.add(() => { calls.push('last'); return 2; });

        expect(multicastFunction.invoke()).toBe(2);
        expect(calls).toEqual(['first', 'last']);
        expect(multicastFunction.length).toBe(0);
        calls.length = 0;
        expect(multicastFunction.invoke()).toBeUndefined();
        expect(calls).toEqual([]);
    });
    it('adding a callback during invoke affects only later invocations', () => {
        const multicastFunction = new MulticastFunction<() => number>();
        const calls: string[] = [];
        const added = () => { calls.push('added'); return 3; };
        multicastFunction.add(() => {
            calls.push('first');
            multicastFunction.add(added);
            return 1;
        });
        multicastFunction.add(() => { calls.push('second'); return 2; });

        expect(multicastFunction.invoke()).toBe(2);
        expect(calls).toEqual(['first', 'second']);
        expect(multicastFunction.length).toBe(3);
        calls.length = 0;
        expect(multicastFunction.invoke()).toBe(3);
        expect(calls).toEqual(['first', 'second', 'added']);
        expect(multicastFunction.length).toBe(4);
    });
    it('equals', () => {
        const multicastFunction1 = new MulticastFunction<() => void>();
        const func = () => {
        };
        multicastFunction1.add(func);

        const multicastFunction2 = new MulticastFunction<() => void>();
        multicastFunction2.add(func);

        const isEquals = multicastFunction1.equals(multicastFunction2);

        expect(isEquals).toBe(true);
    });
    it('equals length not equals', () => {
        const multicastFunction1 = new MulticastFunction<() => void>();
        const func = () => {
        };
        multicastFunction1.add(func);

        const multicastFunction2 = new MulticastFunction<() => void>();
        multicastFunction2.add(func);
        multicastFunction2.add(func);

        const isEquals = multicastFunction1.equals(multicastFunction2);

        expect(isEquals).toBe(false);
    });
    it('equals function not equals', () => {
        const multicastFunction1 = new MulticastFunction<() => void>();
        const func1 = () => {
        };
        multicastFunction1.add(func1);

        const multicastFunction2 = new MulticastFunction<() => void>();
        const func2 = () => {
        };
        multicastFunction2.add(func2);

        const isEquals = multicastFunction1.equals(multicastFunction2);

        expect(isEquals).toBe(false);
    });
    it('equals null', () => {
        const multicastFunction = new MulticastFunction<() => void>();
        const func = () => {
        };
        multicastFunction.add(func);

        const isEquals = multicastFunction.equals(null);

        expect(isEquals).toBe(false);
    });
    it('equals undefined', () => {
        const multicastFunction = new MulticastFunction<() => void>();
        const func = () => {
        };
        multicastFunction.add(func);

        const isEquals = multicastFunction.equals(undefined);

        expect(isEquals).toBe(false);
    });
    it('remove', () => {
        const multicastFunction = new MulticastFunction<() => void>();
        const func = () => {
        };
        multicastFunction.add(func);
        multicastFunction.remove(func);
        expect(multicastFunction.length).toBe(0);
    });
    it('remove not exist value', () => {
        const multicastFunction = new MulticastFunction<() => void>();
        multicastFunction.add(() => {
        });
        const isRemove = multicastFunction.remove(() => {
        });
        expect(isRemove).toBe(false);
        expect(multicastFunction.length).toBe(1);
    });
    it('remove return value', () => {
        const multicastFunction = new MulticastFunction<() => void>();
        const funcToBeRemove = () => {
        };
        multicastFunction.add(funcToBeRemove);
        const isFuncToBeRemoveRemoved = multicastFunction.remove(funcToBeRemove);
        expect(isFuncToBeRemoveRemoved).toBe(true);
        const funcNotInMulticast = () => {
        };
        const isFuncNotInMulticastRemoved = multicastFunction.remove(funcNotInMulticast);
        expect(isFuncNotInMulticastRemoved).toBe(false);
    });
    it('remove duplicate', () => {
        const multicastFunction = new MulticastFunction<() => void>();
        const func = () => {
        };
        multicastFunction.add(func);
        multicastFunction.add(func);
        multicastFunction.remove(func);
        expect(multicastFunction.length).toBe(1);
    });
    it('remove empty multicast from an empty target returns false', () => {
        const target = new MulticastFunction<() => void>();
        const empty = new MulticastFunction<() => void>();

        expect(target.remove(empty)).toBe(false);
        expect(target.length).toBe(0);
        expect(target.equals(empty)).toBe(true);
    });
    it('remove empty multicast preserves callbacks in a non-empty target', () => {
        const target = new MulticastFunction<() => void>();
        const first = jest.fn();
        const second = jest.fn();
        target.add(first);
        target.add(second);
        target.add(first);
        const expected = new MulticastFunction<() => void>();
        expected.add(target);
        const empty = new MulticastFunction<() => void>();

        expect(target.remove(empty)).toBe(false);
        expect(target.length).toBe(3);
        expect(target.equals(expected)).toBe(true);
        target.invoke();
        expect(first).toHaveBeenCalledTimes(2);
        expect(second).toHaveBeenCalledTimes(1);
    });
    it('remove multicast', () => {
        const multicastFunction1 = new MulticastFunction<() => void>();
        const func1 = () => {
        };
        const func2 = () => {
        };
        multicastFunction1.add(func1);
        multicastFunction1.add(func2);
        multicastFunction1.add(func1);
        multicastFunction1.add(func1);
        multicastFunction1.add(func2);

        const multicastFunction2 = new MulticastFunction<() => void>();
        multicastFunction2.add(func1);
        multicastFunction2.add(func2);

        const isRemove = multicastFunction1.remove(multicastFunction2);
        expect(isRemove).toBe(true);
        expect(multicastFunction1.length).toBe(3);

        const multicastFunction3 = new MulticastFunction<() => void>();
        multicastFunction3.add(func1);
        multicastFunction3.add(func2);
        multicastFunction3.add(func1);
        const isEquals = multicastFunction1.equals(multicastFunction3);
        expect(isEquals).toBe(true);
    });
    it('remove not exist multicast', () => {
        const multicastFunction1 = new MulticastFunction<() => void>();
        const func1 = () => {
        };
        multicastFunction1.add(func1);
        multicastFunction1.add(func1);

        const multicastFunction2 = new MulticastFunction<() => void>();
        const func2 = () => {
        };
        multicastFunction2.add(func2);
        multicastFunction2.add(func2);

        const isRemove = multicastFunction1.remove(multicastFunction2);
        expect(isRemove).toBe(false);
        expect(multicastFunction1.length).toBe(2);
    });
    it('remove null', () => {
        const multicastFunction = new MulticastFunction<() => void>();
        const isRemove = multicastFunction.remove(null);
        expect(isRemove).toBe(false);
        expect(multicastFunction.length).toBe(0);
    });
    it('remove undefined', () => {
        const multicastFunction = new MulticastFunction<() => void>();
        const isRemove = multicastFunction.remove(undefined);
        expect(isRemove).toBe(false);
        expect(multicastFunction.length).toBe(0);
    });
    it('length', () => {
        const multicastFunction = new MulticastFunction<() => void>();
        const func = () => {
        };
        multicastFunction.add(func);
        multicastFunction.add(func);
        expect(multicastFunction.length).toBe(2);
    });
    it('clear', () => {
        const multicastFunction = new MulticastFunction<() => void>();
        const func = () => {
        };
        multicastFunction.add(func);
        multicastFunction.add(func);
        multicastFunction.clear();
        expect(multicastFunction.length).toBe(0);
    });
});

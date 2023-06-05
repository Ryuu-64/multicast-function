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
        // @ts-ignore
        const isAdd = multicastFunction.add(null);
        expect(isAdd).toBe(false);
        expect(multicastFunction.length).toBe(0);
    });
    it('add undefined', () => {
        const multicastFunction = new MulticastFunction<() => void>();
        // @ts-ignore
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

        // @ts-ignore
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

        // @ts-ignore
        const isEquals = multicastFunction.equals(null);

        expect(isEquals).toBe(false);
    });
    it('equals undefined', () => {
        const multicastFunction = new MulticastFunction<() => void>();
        const func = () => {
        };
        multicastFunction.add(func);

        // @ts-ignore
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
        // @ts-ignore
        const isRemove = multicastFunction.remove(null);
        expect(isRemove).toBe(false);
        expect(multicastFunction.length).toBe(0);
    });
    it('remove undefined', () => {
        const multicastFunction = new MulticastFunction<() => void>();
        // @ts-ignore
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
});

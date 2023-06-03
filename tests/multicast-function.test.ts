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
});

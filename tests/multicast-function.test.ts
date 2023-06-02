import {MulticastFunction} from '../src';

describe('MulticastFunction', () => {
    it('add', () => {
        const delegate = () => {
        };

        const multicastFunction = new MulticastFunction<() => void>();
        multicastFunction.add(delegate);
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
        const delegate = () => {
        };
        const multicastFunction = new MulticastFunction<() => void>();
        const isDelegateAdd = multicastFunction.add(delegate);
        expect(isDelegateAdd).toBe(true);

        const isNullAdd = multicastFunction.add(null);
        expect(isNullAdd).toBe(false);
    });
    it('repeat add', () => {
        const delegate = () => {
        };
        const multicastFunction = new MulticastFunction<() => void>();
        multicastFunction.add(delegate);
        multicastFunction.add(delegate);
        expect(multicastFunction.length).toBe(2);
    });
    it('invoke', () => {
        let value = 0;

        const delegate = () => {
            value++;
        };

        const multicastFunction = new MulticastFunction<() => void>();
        multicastFunction.add(delegate);
        multicastFunction.invoke();
        expect(value).toBe(1);
    });
    it('remove', () => {
        const delegate = () => {
        };

        const multicastFunction = new MulticastFunction<() => void>();
        multicastFunction.add(delegate);
        multicastFunction.remove(delegate);
        expect(multicastFunction.length).toBe(0);
    });
    it('remove not exist value', () => {
        const delegate = () => {
        };

        const delegateNotInMulticast = () => {
        };

        const multicastFunction = new MulticastFunction<() => void>();
        multicastFunction.add(delegate);
        const isRemove = multicastFunction.remove(delegateNotInMulticast);
        expect(isRemove).toBe(false);
        expect(multicastFunction.length).toBe(1);
    });
    it('remove return value', () => {
        const delegateToBeRemove = () => {
        };
        const multicastFunction = new MulticastFunction<() => void>();
        multicastFunction.add(delegateToBeRemove);
        const isDelegateToBeRemoveRemoved = multicastFunction.remove(delegateToBeRemove);
        expect(isDelegateToBeRemoveRemoved).toBe(true);

        const delegateNotInMulticast = () => {
        };
        const isDelegateNotInMulticastRemoved = multicastFunction.remove(delegateNotInMulticast);
        expect(isDelegateNotInMulticastRemoved).toBe(false);
    });
    it('remove duplicate', () => {
        const delegate = () => {
        };

        const multicastFunction = new MulticastFunction<() => void>();
        multicastFunction.add(delegate);
        multicastFunction.add(delegate);
        multicastFunction.remove(delegate);
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
        const delegate = () => {
        };

        const multicastFunction = new MulticastFunction<() => void>();
        multicastFunction.add(delegate);
        multicastFunction.add(delegate);
        expect(multicastFunction.length).toBe(2);
    });
});

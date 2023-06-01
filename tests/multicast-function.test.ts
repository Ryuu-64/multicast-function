import {MulticastFunction} from '../src';

describe('MulticastFunction', () => {
    it('add', () => {
        let multicastFunction = new MulticastFunction<() => void>();

        let delegate = () => {
        };

        multicastFunction.add(delegate);
        expect(multicastFunction.size()).toBe(1);
    });
    it('repeat add', () => {
        let multicastFunction = new MulticastFunction<() => void>();

        let delegate = () => {
        };

        multicastFunction.add(delegate);
        multicastFunction.add(delegate);
        expect(multicastFunction.size()).toBe(2);
    });
    it('invoke', () => {
        let multicastFunction = new MulticastFunction<() => void>();

        let value = 0;

        let delegate = () => {
            value++;
        };

        multicastFunction.add(delegate);
        multicastFunction.invoke();
        expect(value).toBe(1);
    });
    it('remove', () => {
        let multicastFunction = new MulticastFunction<() => void>();

        let delegate = () => {
        };

        multicastFunction.add(delegate);
        multicastFunction.remove(delegate);
        expect(multicastFunction.size()).toBe(0);
    });
    it('remove duplicate', () => {
        let multicastFunction = new MulticastFunction<() => void>();

        let delegate = () => {
        };

        multicastFunction.add(delegate);
        multicastFunction.add(delegate);
        multicastFunction.remove(delegate);
        expect(multicastFunction.size()).toBe(1);
    });
    it('remove null', () => {
        let multicastFunction = new MulticastFunction<() => void>();

        let delegate = () => {
        };

        multicastFunction.add(delegate);
        // @ts-ignore
        multicastFunction.remove(null);
        expect(multicastFunction.size()).toBe(1);
    });
    it('size', () => {
        let multicastFunction = new MulticastFunction<() => void>();

        let delegate = () => {
        };

        multicastFunction.add(delegate);
        multicastFunction.add(delegate);
        expect(multicastFunction.size()).toBe(2);
    });
});

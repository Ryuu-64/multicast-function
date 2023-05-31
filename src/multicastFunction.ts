export class MulticastFunction<T extends (...args: any[]) => any> {
    private readonly functions: T[] = [];

    add(method: T) {
        this.functions.push(method);
    }

    invoke(...args: Parameters<T>): ReturnType<T> {
        let returnValue: ReturnType<T>;
        this.functions.forEach(
            delegate => returnValue = delegate(...args)
        );
        return returnValue!;
    }

    remove(methodToBeRemove: T): T | null {
        return MulticastFunction.removeLastMatchedElement(this.functions, method => method === methodToBeRemove);
    }

    size(): number {
        return this.functions.length;
    }

    private static removeLastMatchedElement<T>(array: T[], removeIf: (element: T) => boolean): T | null {
        for (let index = array.length - 1; index >= 0; index--) {
            if (removeIf(array[index])) {
                return array.splice(index, 1)[0];
            }
        }
        return null;
    }
}

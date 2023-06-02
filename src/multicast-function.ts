export class MulticastFunction<T extends (...args: any[]) => any> {
    private readonly functions: T[] = [];

    get length() {
        return this.functions.length;
    }

    add(func: T): boolean {
        if (func === null || func === undefined) {
            return false;
        }

        const length = this.functions.length;
        const newLength = this.functions.push(func);
        return newLength > length;
    }

    invoke(...args: Parameters<T>): ReturnType<T> {
        let returnValue: ReturnType<T>;
        this.functions.forEach(
            (func: T) => returnValue = func(...args)
        );
        return returnValue!;
    }

    remove(funcToBeRemove: T): boolean {
        if (funcToBeRemove === null || funcToBeRemove === undefined) {
            return false;
        }

        return MulticastFunction.removeLastMatchedElement(
            this.functions,
            func => func === funcToBeRemove
        );
    }

    private static removeLastMatchedElement<T>(array: T[], removeIf: (element: T) => boolean): boolean {
        for (let index = array.length - 1; index >= 0; index--) {
            if (removeIf(array[index])) {
                array.splice(index, 1);
                return true;
            }
        }
        return false;
    }
}

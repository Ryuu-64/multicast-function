export class MulticastFunction<T extends (...args: any[]) => any> {
    private readonly functions: T[] = [];

    get length() {
        return this.functions.length;
    }

    add(func: T | MulticastFunction<T>): boolean {
        if (func === null || func === undefined) {
            return false;
        }

        if (typeof func === 'function') {
            return this.addFunction(func);
        } else /* if (typeof func === 'object') */ {
            return this.addMulticastFunction(func);
        }
    }

    invoke(...args: Parameters<T>): ReturnType<T> {
        let returnValue: ReturnType<T>;
        this.functions.forEach(
            (func: T) => returnValue = func(...args)
        );
        return returnValue!;
    }

    equals(multicastFunction: MulticastFunction<T>): boolean {
        if (!multicastFunction) {
            return false;
        }

        if (this.functions.length !== multicastFunction.functions.length) {
            return false;
        }

        for (let i = 0; i < this.functions.length; i++) {
            if (this.functions[i] !== multicastFunction.functions[i]) {
                return false;
            }
        }

        return true;
    }

    remove(func: T | MulticastFunction<T>): boolean {
        if (func === null || func === undefined) {
            return false;
        }

        if (typeof func === 'function') {
            return this.removeFunction(func);
        } else /* if (typeof func === 'object') */ {
            return this.removeMulticastFunction(func);
        }
    }

    clear(): void {
        this.functions.splice(0);
    }

    private addFunction(func: T): boolean {
        const length = this.functions.length;
        const newLength = this.functions.push(func);
        return newLength > length;
    }

    private addMulticastFunction(func: MulticastFunction<T>): boolean {
        const length = this.functions.length;
        const newLength = this.functions.push(...func.functions);
        return newLength > length;
    }

    private removeFunction(func: T): boolean {
        for (let index = this.functions.length - 1; index >= 0; index--) {
            if (this.functions[index] === func) {
                this.functions.splice(index, 1);
                return true;
            }
        }
        return false;
    }

    private removeMulticastFunction(multicast: MulticastFunction<T>): boolean {
        const sourceLength = this.length;
        const targetLength = multicast.length;

        for (let index = sourceLength - targetLength; index >= 0; index--) {
            if (this.equal(multicast.functions, index, targetLength)) {
                this.functions.splice(index, targetLength);
                return true;
            }
        }

        return false;
    }

    private equal(functions: T[], start: number, count: number): boolean {
        for (let i = 0; i < count; i++) {
            if (!(this.functions[i + start] === functions[i])) {
                return false;
            }
        }
        return true;
    }
}

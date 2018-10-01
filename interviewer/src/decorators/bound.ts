export default function bound(target: any, propKey: string | symbol):any {
    let originalMethod = target[propKey];
    if (typeof target === "function") {
        return {
            value() {
                return originalMethod.apply(target, arguments);
            }
        };
    } else if (typeof target === "object") {
        return {
            get() {
                let instance = this;

                Object.defineProperty(instance, propKey.toString(), {
                    value() {
                        return originalMethod.apply(instance, arguments);
                    }
                });
                return instance[propKey];
            }
        } as PropertyDescriptor;
    }
}
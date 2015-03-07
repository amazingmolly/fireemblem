module core {
    export interface ArrayCollectAction<T, K> {
        (element: T): K;
    }

    export class ArrayUtil {
        public static collect<T, K>(array: T[], action: ArrayCollectAction<T, K>): K[] {
            var list: K[] = [];
            array.forEach((e) => { list.push(action(e)) });
            return list;
        }
    }
}
module core {
    export interface ArrayCollectAction {
        (element: any): any;
    }

    export class ArrayUtil {
        public static collect(array: any[], action: ArrayCollectAction): any[]{
            var list = [];
            array.forEach((e) => { list.push(action(e)) });
            return list;
        }
    }
}
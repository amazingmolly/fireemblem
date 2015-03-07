module core {

    export interface Point {
        x: number;
        y: number;
    }

    export interface Size {
        width: number;
        height: number;
    }

    export enum Direction {
        Up,
        Down,
        Left,
        Right,
    }

    export interface Vector extends Point {
        dir: Direction;
    }

    export class VectorUtil {
        public static clone(v: Vector): Vector {
            return {
                x: v.x,
                y: v.y,
                dir: v.dir
            };
        }
    }
} 
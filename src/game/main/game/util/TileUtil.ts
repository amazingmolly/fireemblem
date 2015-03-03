module game.util {

    export interface Point {
        x: number;
        y: number;
    }

    export interface Size {
        x: number;
        y: number;
    }

    export class TileUtil {
        public static point2Tile(pos: Point, tile: Size): Point {
            return {
                x: Math.floor(pos.x / tile.x),
                y: Math.floor(pos.y / tile.y)
            };
        }
    }
}
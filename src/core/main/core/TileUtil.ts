/// <reference path="Vector.ts" />
module core {
    export class TileUtil {
        public static point2Tile(pos: Point, tile: Size): Point {
            return {
                x: Math.floor(pos.x / tile.width),
                y: Math.floor(pos.y / tile.height)
            };
        }

        public static within(area: Point[], pos: Point): boolean {
            for (var i = 0; i < area.length; i++) {
                var a = area[i];
                if (pos.x == a.x && pos.y == a.y) {
                    return true;
                }
            }
            return false;
        }
    }
}
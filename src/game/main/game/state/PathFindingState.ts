/// <reference path="State.ts" />
/// <reference path="StateService.ts" />

module game.state {
    import ArrayUtil = core.ArrayUtil;
    import TileUtil = core.TileUtil;
    import Point = core.Point;
    import Size = core.Size;
    import Vector = core.Vector;
    import Direction = core.Direction;

    export class PathFindingState implements State {
        private service: StateService;
        private context: StateContext;
        private area: Point[];

        public constructor(service: StateService) {
            this.service = service;
        }

        public enter(context: StateContext): void {
            this.context = context;
            //
            var hero = this.context.selected;
            hero.spirit.flip(200, [8, 9]);
            // shading
            this.context.shading.update(this.area = this.calculateShadingArea({ x: hero.x, y: hero.y }));
        }

        public handleInput(pos: Point, tile: Size): void {
            pos = TileUtil.point2Tile(pos, tile);
            //
            if (TileUtil.within(this.area, pos)) {
                var heroes = ArrayUtil.collect(this.context.ally.concat(this.context.enemy),
                    (e) => { return { x: e.x, y: e.y } });

                if (!TileUtil.within(heroes, pos)) {
                    var selected = this.context.selected;

                    this.context.shading.update([]);
                    this.context.path = this.calculateMovingPath({ x: selected.x, y: selected.y }, pos);
                    this.service.enter('moving', this.context);
                }
            }
        }

        public handleCancel(): void {
            // 
            var hero = this.context.selected;
            hero.spirit.flip(200, [0, 1, 2]);
            // shading
            this.context.shading.update([]);

            this.context.selected = null;
            this.service.enter('normal', this.context);
        }

        private calculateShadingArea(center: Point): Point[] {
            var area: Point[] = [],
                //hero = this.context.selected,
                i: number, j: number, t = 4;

            // TODO: polish code later
            for (i = -t; i <= t; i++) {
                for (j = t - Math.abs(i); j >= 0; j--) {
                    area.push({ x: center.x + i, y: center.y + j });
                    if (j > 0) {
                        area.push({ x: center.x + i, y: center.y - j });
                    }
                }
            }

            return area;
        }

        private calculateMovingPath(start: Point, end: Point): Vector[] {
            var path: Vector[] = [],
                i: number, dx: number, dy: number;

            // TODO: polish code later
            if (start.x != end.x) {
                dx = start.x > end.x ? -1 : 1;
                for (i = start.x + dx; ; i += dx) {
                    if (dx == -1 && i <= end.x - 1) {
                        break;
                    }
                    if (dx == 1 && i >= end.x + 1) {
                        break;
                    }
                    path.push({ x: i, y: start.y, dir: dx < 0 ? Direction.Left : Direction.Right });
                }
            }

            if (start.y != end.y) {
                dy = start.y > end.y ? -1 : 1;
                for (i = start.y + dy; ; i += dy) {
                    if (dy == -1 && i <= end.y - 1) {
                        break;
                    }
                    if (dy == 1 && i >= end.y + 1) {
                        break;
                    }
                    path.push({ x: end.x, y: i, dir: dy < 0 ? Direction.Up : Direction.Down });
                }
            }

            return path;
        }

    }
}  
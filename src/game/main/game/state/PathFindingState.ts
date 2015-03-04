/// <reference path="State.ts" />
/// <reference path="StateService.ts" />

module game.state {
    import TileUtil = core.TileUtil;
    import Point = core.Point;
    import Size = core.Size;

    export class PathFindingState implements State {
        private service: StateService;
        private context: StateContext;

        public constructor(service: StateService) {
            this.service = service;
        }

        public enter(context: StateContext): void {
            this.context = context;
            //
            var hero = this.context.selected;
            hero.spirit.flip(200, [8, 9]);
            // shading
            this.context.shading.update(this.calculateShadingArea());
        }

        public handleInput(pos: Point, tile: Size): void {
            pos = TileUtil.point2Tile(pos, tile);
            // TODO:
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

        private calculateShadingArea(): Point[] {
            var area: Point[] = [],
                hero = this.context.selected,
                i: number, j: number, t = 4;

            // TODO: polish code later
            for (i = -t; i <= t; i++) {
                for (j = t - Math.abs(i); j >= 0; j--) {
                    area.push({ x: hero.x + i, y: hero.y + j });
                    if (j > 0) {
                        area.push({ x: hero.x + i, y: hero.y - j });
                    }
                }
            }

            return area;
        }
    }
}  
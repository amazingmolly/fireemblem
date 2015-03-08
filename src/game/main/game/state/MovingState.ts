/// <reference path="State.ts" />
/// <reference path="StateService.ts" />

module game.state {
    import TileUtil = core.TileUtil;
    import Point = core.Point;
    import Size = core.Size;
    import Vector = core.Vector;

    export class MovingState implements State {
        private service: StateService;
        private context: StateContext;
        private newPos: Vector;
        private oldPos: Point;
        //private aborted: boolean;

        public constructor(service: StateService) {
            this.service = service;
        }

        public enter(context: StateContext): void {
            //
            this.context = context;
            //
            //this.aborted = false;
            this.newPos = this.context.path.slice(-1).pop(); // last one

            var path = this.context.path,
                start = new Date().getTime(),
                hero = this.context.selected;

            //this.oldPos = { x: hero.x, y: hero.y };

            hero.spirit.animate(4, path);

            //window.setTimeout(() => { this.move(hero, start, path) }, 0);
        }

        public handleInput(pos: Point, tile: Size): void {
            //pos = TileUtil.point2Tile(pos, tile);
            // TODO:
        }
        public handleCancel(): void {
            // TODO:
            //this.aborted = true;

            var hero = this.context.selected;
            hero.spirit.stopAnimate(true);
            //hero.x = this.oldPos.x;
            //hero.y = this.oldPos.y;
            this.service.enter('pathfinding', this.context);
        }

        //private move(hero: Hero, start: number, path: Vector[]): void {
        //    var elapsed = new Date().getTime() - start;
        //}

    }
}  
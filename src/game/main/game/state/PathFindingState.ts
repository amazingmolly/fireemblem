/// <reference path="State.ts" />
/// <reference path="StateService.ts" />

module game.state {
    import TileUtil = util.TileUtil;
    import Point = util.Point;
    import Size = util.Size;

    export class PathFindingState implements State {
        private service: StateService;
        private context: StateContext;

        public constructor(service: StateService) {
            this.service = service;
        }

        public enter(context: StateContext): void {
            this.context = context;
            //
            var hero: Hero = this.context.data.selected;
            hero.spirit.flip(200, [8, 9]);
        }

        public handleInput(pos: Point, tile: Size): void {
            pos = TileUtil.point2Tile(pos, tile);
            // TODO:
        }
        public handleCancel(): void {
            // 
            var hero: Hero = this.context.data.selected;
            hero.spirit.flip(200, [0, 1, 2]);


            this.service.enter('normal', new StateContext(this.context.data.ally));
        }
    }
}  
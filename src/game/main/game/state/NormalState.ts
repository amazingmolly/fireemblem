/// <reference path="State.ts" />
/// <reference path="StateService.ts" />

module game.state {
    import TileUtil = util.TileUtil;
    import Point = util.Point;
    import Size = util.Size;

    export class NormalState implements State {
        private service: StateService;
        private context: StateContext;

        public constructor(service: StateService) {
            this.service = service;
        }

        public enter(context: StateContext): void {
            this.context = context;
        }

        public handleInput(pos: Point, tile: Size): void {
            pos = TileUtil.point2Tile(pos, tile);


            var hero: Hero = null,
                ally: Hero[] = this.context.data;
            for (var i = 0; i < ally.length; i++) {
                if (ally[i].x == pos.x && ally[i].y == pos.y) {
                    hero = ally[i];
                    break;
                }
            }

            if (hero != null) {
                this.service.enter('pathfinding', new StateContext({ selected: hero, ally: ally }));
            }
        }

        public handleCancel(): void {

        }
    }
}  
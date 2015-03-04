/// <reference path="State.ts" />
/// <reference path="StateService.ts" />

module game.state {
    import TileUtil = core.TileUtil;
    import Point = core.Point;
    import Size = core.Size;

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
                ally: Hero[] = this.context.ally;
            for (var i = 0; i < ally.length; i++) {
                if (ally[i].x == pos.x && ally[i].y == pos.y) {
                    hero = ally[i];
                    break;
                }
            }

            if (hero != null) {
                this.context.selected = hero;
                this.service.enter('pathfinding', this.context);
            }
        }

        public handleCancel(): void {

        }
    }
}  
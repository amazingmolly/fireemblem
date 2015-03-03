/// <reference path="StateContext.ts" />
/// <reference path="../util/TileUtil.ts" />

module game.state {
    import Point = util.Point;
    import Size = util.Size;

    export interface State {
        enter(context: StateContext): void;
        handleInput(pos: Point, tile: Size): void;
        handleCancel(): void;
    }
} 
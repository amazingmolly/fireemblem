/// <reference path="StateContext.ts" />

module game.state {
    import Point = core.Point;
    import Size = core.Size;

    export interface State {
        enter(context: StateContext): void;
        handleInput(pos: Point, tile: Size): void;
        handleCancel(): void;
    }
} 
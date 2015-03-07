/// <reference path="Hero.ts" />
module game.state {
    import Spirit = surface.spirit.Spirit;
    import Vector = core.Vector;

    export interface StateContext {
        ally?: Hero[];
        enemy?: Hero[];
        selected?: Hero;
        shading?: Spirit;
        path?: Vector[];
    }
} 
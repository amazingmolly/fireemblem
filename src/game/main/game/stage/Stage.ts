/// <reference path="../GameContext.ts" />

module game.stage {
    export interface Stage {
        init(name: string, context: GameContext): void;
        start(): void;
        stop(): void;
    }
}  
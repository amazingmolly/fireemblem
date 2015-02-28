/// <reference path="misc/ResolutionMonitor.ts" />
/// <reference path="GameContext.ts" />

module game {
    import Manifest = io.Manifest;
    import ResolutionMonitor = misc.ResolutionMonitor;
    export class App {

        private context: GameContext;

        public constructor(manifest: Manifest, context: CanvasRenderingContext2D) {
            this.context = new GameContext(manifest, context);
        }

        public run(): void {
            // Get stage from game state
            this.context.getGameState().getStage().start();

            // Start monitor the resolution change every 1s
            new ResolutionMonitor(this.context.getSurfaceDevice()).listen();
        }
    }
}
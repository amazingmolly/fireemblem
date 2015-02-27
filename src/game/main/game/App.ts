/// <reference path="misc/ResolutionMonitor.ts" />
/// <reference path="GameContext.ts" />

module game {
    import Manifest = io.Manifest;
    import ResolutionMonitor = misc.ResolutionMonitor;
    //import StageFactory = stage.StageFactory;
    //import ResourceService = service.ResourceService;
    //import SurfaceHolder = service.SurfaceHolder;
    //import DirectSurfaceDevice = surface.DirectSurfaceDevice;

    export class App {

        private context: GameContext;

        public constructor(manifest: Manifest, context: CanvasRenderingContext2D) {
            //ResourceService.instance = manifest;
            //SurfaceHolder.instance = new DirectSurfaceDevice(context);
            this.context = new GameContext(manifest, context);
        }

        public run(): void {
            //console.log("Game is running!");

            //// infinite loop
            //var bgm = [
            //    () => { BgmService.instance.playMusic('/bgm/sherlock.mp3'); setTimeout(bgm[1], 5000); },
            //    () => { BgmService.instance.playMusic('/bgm/ally.mp3'); setTimeout(bgm[0], 4000); }
            //];
            //bgm[0]();

            //var stage = StageFactory.create('menu');
            //stage.init(null, SurfaceHolder.instance);
            //stage.start();

            //BgmService.instance.playMusic('/bgm/ally.mp3');


            // Get stage from game state
            this.context.getGameState().getStage().start();

            // Start monitor the resolution change every 1s
            new ResolutionMonitor(this.context.getSurfaceDevice()).listen();
        }
    }
}
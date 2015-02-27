/// <reference path="save/StateService.ts" />
/// <reference path="misc/SoundService.ts" />

module game {
    import Manifest = io.Manifest;
    //import StageFactory = stage.StageFactory;
    //import ResourceService = service.ResourceService;
    //import SurfaceHolder = service.SurfaceHolder;
    import DirectSurfaceDevice = surface.DirectSurfaceDevice;
    //import DirectSoundDevice = audio.DirectSoundDevice;
    import StateService = save.StateService;
    import SoundService = misc.SoundService;

    export class GameContext {
        private manifest: Manifest;
        private surfaceDevice: DirectSurfaceDevice;
        private soundService: SoundService;
        private gameState: StateService;

        public constructor(manifest: Manifest, context: CanvasRenderingContext2D) {
            this.manifest = manifest;
            this.surfaceDevice = new DirectSurfaceDevice(context);
            this.soundService = new SoundService(this);
            this.gameState = new StateService(this);
        }

        public getManifest(): Manifest {
            return this.manifest;
        }

        public getSurfaceDevice(): DirectSurfaceDevice {
            return this.surfaceDevice;
        }

        public getSoundService(): SoundService {
            return this.soundService;
        }

        public getGameState(): StateService {
            return this.gameState;
        }
    }
} 
/// <reference path="save/SavingService.ts" />
/// <reference path="misc/SoundService.ts" />

module game {
    import Manifest = io.Manifest;
    import DirectSurfaceDevice = surface.DirectSurfaceDevice;
    import SavingService = save.SavingService;
    import SoundService = misc.SoundService;

    export class GameContext {
        private manifest: Manifest;
        private surfaceDevice: DirectSurfaceDevice;
        private soundService: SoundService;
        private saving: SavingService;

        public constructor(manifest: Manifest, context: CanvasRenderingContext2D) {
            this.manifest = manifest;
            this.surfaceDevice = new DirectSurfaceDevice(context);
            this.soundService = new SoundService(this);
            this.saving = new SavingService(this);
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

        public getGameState(): SavingService {
            return this.saving;
        }
    }
} 
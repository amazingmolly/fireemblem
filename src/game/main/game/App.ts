module game {
    import Manifest = io.Manifest;
    import DirectSoundDevice = audio.DirectSoundDevice;
    import DirectSurfaceDevice = surface.DirectSurfaceDevice;

    export class App {

        private manifest: Manifest;
        private dsd: DirectSoundDevice;
        private dfd: DirectSurfaceDevice;

        public constructor(manifest: Manifest) {
            this.manifest = manifest;
            this.dsd = new DirectSoundDevice();
        }

        public run(): void {
            console.log("Game is running!");

            //new surface.DirectSurface().play();
            var bgm = '/bgm/main.mp3';
            this.dsd.createSound(this.manifest.get(bgm), bgm, true).play();
        }
    }
}
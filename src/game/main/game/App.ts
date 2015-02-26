module game {
    import Manifest = io.Manifest;
    import ResourceService = service.ResourceService;
    import BgmService = service.BgmService;

    export class App {

        public constructor(manifest: Manifest) {
            ResourceService.instance = manifest;
        }

        public run(): void {
            console.log("Game is running!");

            //// infinite loop
            //var bgm = [
            //    () => { BgmService.instance.playMusic('/bgm/sherlock.mp3'); setTimeout(bgm[1], 5000); },
            //    () => { BgmService.instance.playMusic('/bgm/alley.mp3'); setTimeout(bgm[0], 4000); }
            //];
            //bgm[0]();


            BgmService.instance.playMusic('/bgm/alley.mp3');
        }
    }
}
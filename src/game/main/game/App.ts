module game {
    import Manifest = io.Manifest;

    export class App {

        public constructor(manifest: Manifest) {
            console.log(manifest.name());
        }

        public run(): void {
            console.log("Game is running!");

            new surface.DirectSurface().play();
        }
    }

    new App((<any>window).fe.res).run();
}
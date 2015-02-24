/// <reference path="SplashScreen.ts" />

module loader {
    export class App {
        public static main(): void {
            document.onreadystatechange = () => {
                if (document.readyState == 'complete') {
                    new SplashScreen(<HTMLCanvasElement>document.querySelector('canvas')).run();
                }
            };
        }
    }

    App.main();
} 
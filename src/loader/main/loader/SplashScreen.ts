/// <reference path="HttpBot.ts" />
/// <reference path="FPS.ts" />

module loader {
    import Manifest = io.Manifest;

    export class SplashScreen {
        private root: HTMLCanvasElement;
        private context: CanvasRenderingContext2D;
        private fps: FPS;
        private stopped: boolean;

        private error: string;
        private progress: string;

        private manifest: any;
        private artifact: any;
        private res: Manifest;

        public constructor(root: HTMLCanvasElement) {
            this.root = root;
            this.context = root.getContext('2d');
            this.fps = new FPS();
            this.res = new Manifest();
            this.stopped = false;
        }

        public run(): void {

            this.progress = `Loading manifest (from cache)...`;

            this.res.loadFromCache(
                () => {
                    this.launchGame();
                },
                () => {
                    new HttpBot().
                        progress((e) => { this.onProgressReport(e) }).
                        done((e) => { this.onDownloadCompleted(e) }).
                        error((e) => { this.onDownloadError(e) }).
                        get('main/manifest.json', 'json').
                        get('main/artifact.bin', 'blob');
                });
 
            // disable context menu
            this.root.oncontextmenu = (e) => { return false };

            window.requestAnimationFrame(() => { this.render() });
        }

        private render(): void {
            this.fps.tick();

            this.drawBackground();
            this.drawLogo();
            this.drawProgress();
            this.drawFPS();

            if (!this.stopped) {
                window.requestAnimationFrame(() => { this.render() });
            }
        }

        private drawBackground(): void {
            this.context.fillStyle = 'black';
            this.context.fillRect(0, 0, this.root.width, this.root.height);
        }

        private drawLogo(): void {
            this.context.font = "3em Calibri";
            this.context.fillStyle = 'white';
            this.context.fillText('FIRE EMBLEM II', this.root.width / 2 - 120, this.root.height / 2 - 30);
        }

        private drawProgress(): void {
            if (this.error != null) {
                this.context.font = "1em Calibri";
                this.context.fillStyle = 'RGB(255,127,39)';
                this.context.fillText(this.error, 15, this.root.height - 25);
            } else {
                this.context.font = "1em Calibri";
                this.context.fillStyle = 'RGB(153,217,234)';
                this.context.fillText(this.progress, 15, this.root.height - 25);
            }
        }

        private drawFPS(): void {
            this.context.font = "0.8em Calibri";
            this.context.fillStyle = 'white';
            this.context.fillText(`FPS: ${this.fps.get() }`, this.root.width - 50, 15);
        }

        private onProgressReport(e: HttpBotEvent): void {
            this.progress = `Loading ${e.target} (${e.loaded / e.total * 100}%)...`;
        }

        private onDownloadError(e: HttpBotEvent): void {
            this.error = e.target + '; ' + e.error.message;
        }

        private onDownloadCompleted(e: HttpBotEvent): void {
            if (e.target == 'main/manifest.json') {
                this.manifest = e.data;
            } else if (e.target == 'main/artifact.bin') {
                this.artifact = e.data;
                this.progress = `Loading manifest...`;
                this.res.load(
                    this.manifest,
                    this.artifact,
                    () => {
                        this.res.persist();
                        this.launchGame();
                    });
            }
        }

        private launchGame(): void {
            this.progress = 'Initializing game...';

            [
                '/bin/core.js',
                '/bin/surface.js',
                '/bin/audio.js',
                '/bin/scene.js',
                '/bin/ai.js',
                '/bin/game.js'
            ].forEach((it) => {
                //eval(this.res.get(it))
                var script = document.createElement('script');
                script.id = it;
                script.text = this.res.get(it);
                document.querySelector('head').appendChild(script);
            });

            // call the game entry point
            new (<any>window).game.App(this.res, this.context).run();

            // test
            //var cc = new Image();
            //cc.src = this.res.get('/avatar/enemy.svg');
            //this.context.drawImage(cc, 0, 0);

            
            // stop splash screen
            this.stopped = true;
        }
    }
}  
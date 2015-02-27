/// <reference path="Surface.ts" />
/// <reference path="spirit/TextSpirit.ts" />
/// <reference path="FPS.ts" />

module surface {
    import Spirit = spirit.Spirit;
    import TextSpirit = spirit.TextSpirit;

    export class BasicSurface implements Surface {
        protected context: CanvasRenderingContext2D;
        protected dead: boolean;
        protected spirits: Spirit[];
        protected isShowFPS: boolean;

        private static fps: FPS = new FPS();

        public constructor(context: CanvasRenderingContext2D) {
            this.context = context;
            this.dead = false;
            this.isShowFPS = false;
            this.spirits = [];
        }

        public showFPS(show: boolean = true): void {
            this.isShowFPS = show;
        }

        public createText(text: string, font: string = '1em', style: string = 'white'): Spirit {
            var spirit = new TextSpirit(text, font, style);
            this.spirits.push(spirit);
            return spirit;
        }

        public render(): void {
            if (this.dead) {
                return;
            }

            // Draw background
            this.context.fillStyle = 'black';
            this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);

            // Draw all the spirits one by one
            this.spirits.forEach((e) => { e.draw(this.context) });

            // FPS
            if (this.isShowFPS) {
                BasicSurface.fps.tick();
                this.context.font = "0.8em Calibri";
                this.context.fillStyle = 'white';
                this.context.fillText(`FPS: ${BasicSurface.fps.get() }`, this.context.canvas.width - 50, 15);
            }

            window.requestAnimationFrame(() => { this.render() });
        }

        public destory(): void {
            this.dead = true;
        }
    }
}
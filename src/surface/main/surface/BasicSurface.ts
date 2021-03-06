﻿/// <reference path="Surface.ts" />
/// <reference path="spirit/FlameSpirit.ts" />
/// <reference path="spirit/TextSpirit.ts" />
/// <reference path="filter/ShadingSpirit.ts" />
/// <reference path="FPS.ts" />

module surface {
    import Spirit = spirit.Spirit;
    import TextSpirit = spirit.TextSpirit;
    import FlameSpirit = spirit.FlameSpirit;
    import ShadingSpirit = filter.ShadingSpirit;

    interface MouseEventListener {
        (ev: MouseEvent): any;
    }

    export class BasicSurface implements Surface {
        protected context: CanvasRenderingContext2D;
        protected dead: boolean;
        protected spirits: Spirit[];
        protected isShowFPS: boolean;

        private mousedown: MouseEventListener;
        private mouseup: MouseEventListener;
        private mousemove: MouseEventListener;

        protected mousedownleft: MouseDownLeftCallback;
        protected mousedownright: MouseDownRightCallback;

        private static fps: FPS = new FPS();


        public constructor(context: CanvasRenderingContext2D) {
            this.context = context;
            this.dead = false;
            this.isShowFPS = false;
            this.spirits = [];

            // event
            this.context.canvas.addEventListener('mousedown', this.mousedown = (e) => { this.onMouseDown(e) });
            this.context.canvas.addEventListener('mouseup', this.mouseup = (e) => { this.onMouseUp(e) });
            this.context.canvas.addEventListener('mousemove', this.mousemove = (e) => { this.onMouseMove(e) });
        }

        public showFPS(show: boolean = true): void {
            this.isShowFPS = show;
        }

        public createText(text: string, font: string = '1em', style: string = 'white'): Spirit {
            var spirit = new TextSpirit(text, font, style).init(this.context);
            this.spirits.push(spirit);
            return spirit;
        }

        public createFlame(width: number, height: number): Spirit {
            var spirit = new FlameSpirit(width, height).init(this.context);
            this.spirits.push(spirit);
            return spirit;
        }

        public createSpirit(data: string): Spirit {
            throw new Error('Cannot create spirit ojbect from BasicSurface');
        }

        public createMap(a: number, b: number, map: number[], data: string[]): Spirit {
            throw new Error('Cannot create map ojbect from BasicSurface');
        }

        public render(): void {
            if (this.dead) {
                return;
            }

            // Draw background
            this.context.globalCompositeOperation = "source-over";
            this.context.fillStyle = 'black';
            this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);

            // Draw all the spirits one by one
            this.spirits.forEach((e) => { e.draw() });

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

            // event
            this.context.canvas.removeEventListener('mousedown', this.mousedown);
            this.context.canvas.removeEventListener('mouseup', this.mouseup);
            this.context.canvas.removeEventListener('mousemove', this.mousemove);
        }

        protected onMouseDown(e: MouseEvent) {
            if (e.button == 0) {
                e.cancelBubble = true;
                this.handleMouseDownLeft(e.x, e.y);
            } else if (e.button == 2) {
                e.cancelBubble = true;
                this.handleMouseDownRight(e.x, e.y);
            }
        }

        protected onMouseUp(e: MouseEvent) {
            // TODO:
        }

        protected onMouseMove(e: MouseEvent) {
            // TODO:
        }

        protected handleMouseDownLeft(x: number, y: number): void {
            x -= this.context.canvas.offsetLeft;
            y -= this.context.canvas.offsetTop;

            this.spirits.forEach((e) => { e.handleMouseDownLeft(x, y) });

            if (this.mousedownleft) {
                this.mousedownleft(x, y, this.context.canvas.offsetWidth, this.context.canvas.offsetHeight);
            }
        }

        protected handleMouseDownRight(x: number, y: number): void {
            x -= this.context.canvas.offsetLeft;
            y -= this.context.canvas.offsetTop;

            this.spirits.forEach((e) => { e.handleMouseDownRight(x, y) });

            if (this.mousedownright) {
                this.mousedownright();
            }
        }

        public onMouseDownLeft(callback: MouseDownLeftCallback): void {
            this.mousedownleft = callback;
        }
        public onMouseDownRight(callback: MouseDownRightCallback): void {
            this.mousedownright = callback;
        }

        public createShading(): Spirit {
            var spirit = new ShadingSpirit().init(this.context);
            this.spirits.push(spirit);
            return spirit;
        }

    }
}
module loader {
    export class FPS {
        private counter: number;
        private fps: number;

        public constructor() {
            this.fps = 60;
            this.counter = 0;

            window.setInterval(() => {
                this.fps = this.counter;
                this.counter = 0;
            }, 1000);
        }

        public tick(): void {
            this.counter++;
        }

        public get(): number {
            return this.fps;
        }
    }
}
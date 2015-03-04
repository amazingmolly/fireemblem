/// <reference path="Spirit.ts" />
/// <reference path="Blinker.ts" />

module surface.spirit {
    export class BasicSpirit implements Spirit {
        protected context: CanvasRenderingContext2D;
        protected x: number;
        protected y: number;
        protected tapCallback: Function;
        protected blinker: Blinker = new Blinker();

        public placeTo(x: number, y: number): Spirit {
            this.x = x;
            this.y = y;
            return this;
        }
        public tap(callback: Function): Spirit {
            this.tapCallback = callback;
            return this;
        }

        public init(context: CanvasRenderingContext2D): Spirit {
            this.context = context;
            return this;
        }

        public blink(timeout: number, callback: Function): Spirit {
            this.blinker.enable();
            window.setTimeout(() => {
                this.blinker.disable();
                callback();
            }, timeout);
            return this;
        }

        public flip(timeout: number, scope: number[]): Spirit {
            throw new Error('Cannot call BasicSpirit::flip directly');
        }

        public draw(): void {
            throw new Error('Cannot call BasicSpirit::draw directly');
        }

        public handleMouseDownLeft(x: number, y: number): void {
            // TODO:
        }
        public handleMouseDownRight(x: number, y: number): void {
            // TODO:
        }

        public update(data: any): Spirit {
            return this;
        }

        protected fireTap(): void {
            if (this.tapCallback) {
                this.tapCallback();
            }
        }
    }
} 
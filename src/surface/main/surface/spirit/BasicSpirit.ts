/// <reference path="Spirit.ts" />

module surface.spirit {
    export class BasicSpirit implements Spirit {
        protected x: number;
        protected y: number;

        public placeTo(x: number, y: number): Spirit {
            this.x = x;
            this.y = y;
            return this;
        }
        public tap(callback: Function): Spirit {
            // TODO:
            return this;
        }

        public draw(context: CanvasRenderingContext2D): void {
            throw new Error('Cannot call basic spirit::draw directly');
        }
    }
} 
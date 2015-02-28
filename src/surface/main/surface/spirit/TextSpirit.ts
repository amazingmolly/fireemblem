/// <reference path="BasicSpirit.ts" />

module surface.spirit {
    export class TextSpirit extends BasicSpirit {
        private text: string;
        private font: string;
        private style: string;
        private metrics: number;

        public constructor(text: string, font: string, style: string) {
            super();

            this.text = text;
            this.font = font;
            this.style = style;
        }

        public init(context: CanvasRenderingContext2D): Spirit {
            super.init(context);

            context.font = this.font;
            context.fillStyle = this.style;
            this.metrics = context.measureText(this.text).width;
            return this;
        }

        public placeTo(x: number, y: number): Spirit {
            this.x = this.context.canvas.width * x / 100;
            this.y = this.context.canvas.height * y / 100;
            return this;
        }

        public draw(): void {
            if (this.blinker.tick()) {
                return;
            }
            this.context.font = this.font;
            this.context.fillStyle = this.style;
            this.context.fillText(this.text, this.x, this.y);
        }

        public handleMouseDownLeft(x: number, y: number): void {
            if (x > this.x && x < this.x + this.metrics
                && y > this.y - 16 && y < this.y + 4) {
                this.fireTap();
            }
        }

    }
} 
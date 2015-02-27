/// <reference path="BasicSpirit.ts" />

module surface.spirit {
    export class TextSpirit extends BasicSpirit {
        private text: string;
        private font: string;
        private style: string;

        public constructor(text: string, font: string, style: string) {
            super();

            this.text = text;
            this.font = font;
            this.style = style;
        }

        public draw(context: CanvasRenderingContext2D): void {
            context.font = this.font;
            context.fillStyle = this.style;
            context.fillText(this.text,
                context.canvas.width * this.x / 100,
                context.canvas.height * this.y / 100);
        }
    }
} 
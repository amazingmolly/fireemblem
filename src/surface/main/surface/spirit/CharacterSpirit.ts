/// <reference path="BasicSpirit.ts" />
/// <reference path="Fliper.ts" />

module surface.spirit {
    import Fliper = spirit.Fliper;

    export class CharacterSpirit extends BasicSpirit {
        private data: HTMLImageElement;
        private fliper: Fliper;

        public constructor(data: string) {
            super();
            this.data = new Image();
            this.data.src = data;
        }

        public draw(): void {
            var piece = this.data.width > 200 ? 14 : 3, // TODO: ally 14, enemy 3
                picWidth = this.data.width / piece,
                picHeight = this.data.height,
                unitWidth = this.context.canvas.width / 20,
                unitHeight = this.context.canvas.height / 15;

            if (this.fliper == null) {
                this.context.drawImage(this.data,
                    0, 0, picWidth, picHeight,
                    unitWidth * this.x, unitHeight * this.y, unitWidth, unitWidth);
            } else {
                this.context.drawImage(this.data,
                    this.fliper.offset() * picWidth, 0, picWidth, picHeight,
                    unitWidth * this.x, unitHeight * this.y, unitWidth, unitWidth);
            }
        }

        public handleMouseDownLeft(x: number, y: number): void {
            // TODO:
        }

        public flip(timeout: number, scope: number[]): Spirit {
            this.fliper = new Fliper(timeout, scope);
            return this;
        }

    }
}  
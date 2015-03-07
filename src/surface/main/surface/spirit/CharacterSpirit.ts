/// <reference path="BasicSpirit.ts" />
/// <reference path="../effect/Fliper.ts" />
/// <reference path="../effect/Animation.ts" />

module surface.spirit {
    import Fliper = effect.Fliper;
    import Animation = effect.Animation;
    import Vector = core.Vector;

    export class CharacterSpirit extends BasicSpirit {
        private data: HTMLImageElement;
        private fliper: Fliper;
        private animation: Animation;

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
                unitHeight = this.context.canvas.height / 15,
                x = this.x,
                y = this.y;

            if (this.animation != null) {
                var pos = this.animation.getCurrentPosition();
                x = pos.x;
                y = pos.y;
                if (this.animation.isDirectionChanged()) {
                    var dir = pos.dir;
                    this.flip(200, [6 + dir * 2, 7 + dir * 2]);
                    //console.log(`change dir to ${dir}@${x},${y}`);
                }
            }

            if (this.fliper == null) {
                this.context.drawImage(this.data,
                    0, 0, picWidth, picHeight,
                    unitWidth * x, unitHeight * y, unitWidth, unitWidth);
            } else {
                this.context.drawImage(this.data,
                    this.fliper.offset() * picWidth, 0, picWidth, picHeight,
                    unitWidth * x, unitHeight * y, unitWidth, unitWidth);
            }
        }

        public handleMouseDownLeft(x: number, y: number): void {
            // TODO:
        }

        public flip(timeout: number, scope: number[]): Spirit {
            this.fliper = new Fliper(timeout, scope);
            return this;
        }

        public animate(velocity: number, path: Vector[]): Spirit {
            this.animation = new Animation(velocity, path);
            return this;
        }

        public stopAnimate(cancel: boolean): Spirit {
            var pos = cancel ? this.animation.rollback() : this.animation.commit();

            this.animation = null;
            //this.x = pos.x;
            //this.y = pos.y;

            return this;
        }
    }
}  
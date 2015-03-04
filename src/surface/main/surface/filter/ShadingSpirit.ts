/// <reference path="../spirit/BasicSpirit.ts" />
module surface.filter {
    import Spirit = spirit.Spirit;
    import BasicSpirit = spirit.BasicSpirit;
    import Point = core.Point;


    export class ShadingSpirit extends BasicSpirit {
        private area: Point[] = [];


        public draw(): void {
            var unitWidth = this.context.canvas.width / 20,
                unitHeight = this.context.canvas.height / 15;

            this.context.globalAlpha = 0.1;
            this.context.fillStyle = 'black';

            this.area.forEach((e) => {
                this.context.fillRect(e.x * unitWidth, e.y * unitHeight, unitWidth, unitHeight);
            });
            this.context.globalAlpha = 1;
        }

        public update(data: any): Spirit {
            this.area = data;
            return this;
        }

    }
}   
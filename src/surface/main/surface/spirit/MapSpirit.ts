/// <reference path="BasicSpirit.ts" />

module surface.spirit {
    export class MapSpirit extends BasicSpirit {
        private a: number;
        private b: number;
        private map: number[];
        private tiles: HTMLImageElement[];
        private cache: ImageData;

        public constructor(a: number, b: number, map: number[], data: string[]) {
            super();

            this.a = a;
            this.b = b;
            this.map = map;
            this.tiles = core.ArrayUtil.collect(data,(e) => {
                var img = new Image();
                img.src = e; // base64 svg data
                return img;
            });
        }

        public draw(): void {
            if (this.cache == null) {
                var unitWidth = this.context.canvas.width / 20,
                    unitHeight = this.context.canvas.height / 15;

                for (var x = 0; x < this.a; x++) {
                    for (var y = 0; y < this.b; y++) {
                        var idx = this.map[x + y * this.a];
                        this.context.drawImage(this.tiles[idx], x * unitWidth, y * unitHeight, unitWidth, unitHeight);
                    }
                }
                this.cache = this.context.getImageData(0, 0, this.context.canvas.width, this.context.canvas.height);
            } else {
                this.context.putImageData(this.cache, 0, 0);
            }
        }
    }
}  
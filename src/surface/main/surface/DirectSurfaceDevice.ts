/// <reference path="Surface.ts" />
/// <reference path="BasicSurface.ts" />
/// <reference path="TileSurface.ts" />

module surface {
    export class DirectSurfaceDevice {
        private context: CanvasRenderingContext2D;

        public constructor(context: CanvasRenderingContext2D) {
            this.context = context;
        }

        public createBasic(): Surface {
            return new BasicSurface(this.context);
        }

        public createTileSystem(): Surface {
            return new TileSurface(this.context);
        }
    }
}
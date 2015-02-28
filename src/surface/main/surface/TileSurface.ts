/// <reference path="spirit/Spirit.ts" />
/// <reference path="spirit/MapSpirit.ts" />
/// <reference path="spirit/CharacterSpirit.ts" />
/// <reference path="BasicSurface.ts" />

module surface {
    import Spirit = spirit.Spirit;
    import CharacterSpirit = spirit.CharacterSpirit;
    import MapSpirit = spirit.MapSpirit;

    export class TileSurface extends BasicSurface {
        private width: number;
        private height: number;

        public constructor(context: CanvasRenderingContext2D) {
            super(context);
            this.updateTileSize();
        }

        public updateTileSize(): void {
            this.width = this.context.canvas.width / 20;
            this.height = this.context.canvas.height / 15;
        }

        public createSpirit(data: string): Spirit {
            var spirit = new CharacterSpirit(data).init(this.context);
            this.spirits.push(spirit);
            return spirit;
        }

        public createMap(a: number, b: number, map: number[], data: string[]): Spirit {
            var spirit = new MapSpirit(a, b, map, data).init(this.context);
            this.spirits.push(spirit);
            return spirit;
        }

    }
}
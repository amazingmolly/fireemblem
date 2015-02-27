/// <reference path="Stage.ts" />
/// <reference path="Battlefield.ts" />
/// <reference path="continent.ts" />
/// <reference path="Dungeon.ts" />
/// <reference path="Menu.ts" />

module game.stage {
    export class StageFactory {
        public static create(name: string): Stage {
            switch (name) {
                case 'menu': return new Menu();
                //case 'continent': return new Continent();
                //case 'dungeon': return new Dungeon();
                //case 'battlefield': return new Battlefield();
                default: throw new Error(`Unknown stage of ${name}`);
            }
        }
    }
} 
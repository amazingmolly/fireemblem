module game.state {
    import Spirit = surface.spirit.Spirit;

    export interface HeroClass {
        // class id
        id: number;

        // class name, e.g. 勇士, 战士, 弓箭手, 魔导师
        name: string;

        // spirit id used to render the character
        spirit: number;
    }

    export interface HeroIndicator {
        hitpoint: number;
        damage: number;
        initiate: number;
        skill: number;
        fortune: number;
        defense: number;
        movement: number;
    }

    export interface HeroData {
        name: string;
        avatar: number;
        level: number;
        indicators: number[]; // [ 28, 10, 7, 6, 7, 6, 4 ]
        grow: number[];
        profession: HeroClass;

        // TODO: use profession.spirit instead
        character: number; 
    }

    export interface Hero {
        x: number;
        y: number;
        ref: string;
        data: HeroData;
        spirit?: Spirit;
        avatar?: Spirit;
    }
} 
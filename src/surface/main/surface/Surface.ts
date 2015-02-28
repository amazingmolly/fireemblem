/// <reference path="spirit/Spirit.ts" />

module surface {
    import Spirit = spirit.Spirit;

    export interface Surface {
        render(): void;
        destory(): void;

        showFPS(show?: boolean): void;

        createText(text: string, font?: string, style?: string): Spirit;
        createFlame(width: number, height: number): Spirit;
    }
}
/// <reference path="spirit/Spirit.ts" />

module surface {
    import Spirit = spirit.Spirit;

    export interface MouseDownLeftCallback {
        (x: number, y: number, width: number, height: number): void;
    }
    export interface MouseDownRightCallback {
        (): void;
    }

    export interface Surface {
        render(): void;
        destory(): void;
        onMouseDownLeft(callback: MouseDownLeftCallback): void;
        onMouseDownRight(callback: MouseDownRightCallback): void;
        showFPS(show?: boolean): void;

        createText(text: string, font?: string, style?: string): Spirit;
        createFlame(width: number, height: number): Spirit;
        createSpirit(data: string): Spirit;
        createMap(a: number, b: number, map: number[], data: string[]): Spirit;
    }
}
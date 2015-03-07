module surface.spirit {
    import Vector = core.Vector;

    export interface Spirit {
        placeTo(x: number, y: number): Spirit;
        blink(timeout: number, callback: Function): Spirit;
        tap(callback: Function): Spirit;
        flip(timeout: number, scope: number[]): Spirit;
        update(data: any): Spirit;

        animate(velocity: number, path: Vector[]): Spirit;
        stopAnimate(cancel: boolean): Spirit;

        init(context: CanvasRenderingContext2D): Spirit;
        draw(): void;

        handleMouseDownLeft(x: number, y: number): void;
        handleMouseDownRight(x: number, y: number): void;
    }
} 
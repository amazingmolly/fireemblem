module surface.spirit {
    export interface Spirit {
        placeTo(x: number, y: number): Spirit;
        tap(callback: Function): Spirit;

        draw(context: CanvasRenderingContext2D): void;
    }
} 
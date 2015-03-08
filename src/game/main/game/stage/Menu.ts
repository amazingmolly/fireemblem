/// <reference path="Stage.ts" />

module game.stage {
    import Surface = surface.Surface;
    import Spirit = surface.spirit.Spirit;

    export class Menu implements Stage {
        private context: GameContext;
        private surface: Surface;

        private flame: Spirit;
        private logo: Spirit;
        private menuStart: Spirit;
        private menuLoad: Spirit;

        public init(name: string, context: GameContext): void {
            this.context = context;

            this.surface = this.context.getSurfaceDevice().createBasic();
            this.surface.showFPS();

            this.flame = this.surface.createFlame(100, 300).placeTo(45, 30);
            this.logo = this.surface.createText('FIRE EMBLEM II', '3em Calibri').placeTo(35, 42);
            this.menuStart = this.surface.createText('START', '1.5em Calibri').placeTo(48, 60).tap(() => { this.onNewGame() });
            this.menuLoad = this.surface.createText('LOAD', '1.5em Calibri').placeTo(48, 65).tap(() => { this.onLoadGame() });
        }
        public start(): void {
            this.context.getSoundService().playMusic('/bgm/main-menu.ogg');
            this.surface.render();
        }
        public stop(): void {
            this.surface.destory();
        }

        private onNewGame(): void {
            this.context.getSoundService().playEffect('/effect/game-start.ogg');
            this.menuStart.blink(3000,() => { this.onNewGame2() });
        }

        private onNewGame2(): void {
            // TODO: it's supposed to switch to Dungeon#1 village
            this.stop();
            this.context.getGameState().nextStage().start();
        }

        private onLoadGame(): void {
            // TODO:
            console.log('onLoadGame');
        }
    }
}   
﻿/// <reference path="Stage.ts" />

module game.stage {
    import Surface = surface.Surface;
    import Spirit = surface.spirit.Spirit;

    export class Menu implements Stage {
        private context: GameContext;
        private surface: Surface;

        private logo: Spirit;
        private menuStart: Spirit;
        private menuLoad: Spirit;

        public init(name: string, context: GameContext): void {
            this.context = context;

            this.surface = this.context.getSurfaceDevice().createBasic();
            this.surface.showFPS();

            this.logo = this.surface.createText('FIRE EMBLUM II', '3em Calibri').placeTo(36, 45);
            this.menuStart = this.surface.createText('START', '1.5em Calibri').placeTo(48, 60).tap(() => { this.onNewGame() });
            this.menuLoad = this.surface.createText('LOAD', '1.5em Calibri').placeTo(48, 65).tap(() => { this.onLoadGame() });
        }
        public start(): void {
            this.context.getSoundService().playMusic('/bgm/main-menu.mp3');
            //BgmService.instance.playMusic('/bgm/main-menu.mp3');
            //this.surface.render();
            //console.log('Start menu stage');
            this.surface.render();
        }
        public stop(): void {
            this.surface.destory();
        }

        private onNewGame(): void {
            //BgmService.instance.playMusic('/effect/game-start.mp3');
            //this.menuStart.blink(3000).then(() => { this.onNewGame2() });
        }

        private onNewGame2(): void {
            // TODO: it's supposed to switch to Dungeon#1 village
            console.log('Game is about to start!');
            //var stage = StageFactory.create('battlefield');
            //stage.init('/chapter/01.json', SurfaceHolder.instance);
            //this.stop();
            //stage.start();
        }

        private onLoadGame(): void {
            // TODO:
        }
    }
}   
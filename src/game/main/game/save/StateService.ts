/// <reference path="../stage/StageFactory.ts" />
/// <reference path="../GameContext.ts" />

module game.save {
    import Stage = stage.Stage;
    import StageFactory = stage.StageFactory;

    export class StateService {
        private context: GameContext;

        public constructor(context: GameContext) {
            this.context = context;
        }

        public save(): void {

        }
        public load(): void {

        }

        public get(name: string): any {
            // TODO:
            switch (name) {
                case 'ally_force':
                    return JSON.parse(this.context.getManifest().get('/hero/ally.json'));
                case 'enemy_force':
                    return JSON.parse(this.context.getManifest().get('/hero/enemy.json'));
                default:
                    throw new Error('Unknown request to StateService');
            }
        }

        public nextStage(): Stage {
            // TODO:

            var stage = StageFactory.create('battlefield');
            stage.init('/chapter/01.json', this.context);
            return stage;
        }

        public getStage(): Stage {
            // TODO:

            var stage = StageFactory.create('menu');
            stage.init(null, this.context);
            return stage;
        }
    }
} 
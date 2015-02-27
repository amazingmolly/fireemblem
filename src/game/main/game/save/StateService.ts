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

        public getStage(): Stage {
            // TODO:

            var stage = StageFactory.create('menu');
            stage.init(null, this.context);
            return stage;
        }
    }
} 
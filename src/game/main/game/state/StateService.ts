/// <reference path="State.ts" />
/// <reference path="NormalState.ts" />
/// <reference path="PathFindingState.ts" />
/// <reference path="MovingState.ts" />
/// <reference path="StateContext.ts" />

module game.state {
    export class StateService {
        private context: GameContext;
        private state: State;
        private states: { [key: string]: State; };

        public constructor(context: GameContext) {
            this.context = context;

            this.states = {
                'normal': new NormalState(this),
                'pathfinding': new PathFindingState(this),
                'moving': new MovingState(this),
                //new Moving(),
                //new Deciding(),
                //new Battling(),
                //new Trading(),
                //new Postmortem(),
                //new ScriptAction(),
                //new EnemyAction()
            };
            //this.state = this.states['normal'];
        }

        public current(): State {
            return this.state;
        }

        public enter(which: string, context: StateContext): void {
            this.state = this.states[which];
            this.state.enter(context);
        }

        public getGameContext(): GameContext {
            return this.context;
        }
    }
}  
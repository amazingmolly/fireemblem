module game.stage {
    import Surface = surface.Surface;
    import Spirit = surface.spirit.Spirit;
    import ArrayUtil = core.ArrayUtil;

    export class Battlefield implements Stage {
        private context: GameContext;
        private surface: Surface;

        private chapter: any;
        private ally: any[];
        private enemy: any[];
        private ally_force: any[];
        private enemy_force: any[];

        public init(name: string, context: GameContext): void {
            this.context = context;

            this.surface = context.getSurfaceDevice().createTileSystem();
            this.surface.showFPS();

            this.chapter = JSON.parse(this.context.getManifest().get(name));

            this.initMap(this.chapter.size[0], this.chapter.size[1], this.chapter.map);

            this.initAlly(this.chapter.ally, this.ally_force = this.context.getGameState().get('ally_force'));
            this.initEnemy(this.chapter.enemy, this.enemy_force = this.context.getGameState().get('enemy_force'));

            //this.initScript(this.chapter.script);

            //this.state = [
            //    new Idling(),
            //    new Thinking(),
            //    new Moving(),
            //    new Deciding(),
            //    new Battling(),
            //    new Trading(),
            //    new Postmortem(),
            //    new ScriptAction(),
            //    new EnemyAction()
            //];
        }
        public start(): void {
            this.context.getSoundService().playMusic('/bgm/ally.mp3');
            this.surface.render();
        }
        public stop(): void {
            this.surface.destory();
        }

        private initAlly(meta: any[], force: any[]): void {
            this.ally = ArrayUtil.collect(meta,(e) => {
                var hero = {
                    x: e.position[0],
                    y: e.position[1],
                    ref: e.ref,
                    data: force[e.ref],
                    spirit: null,
                    avatar: null
                };
                hero.spirit = this.surface.createSpirit(this.context.getManifest().get(this.makeCharacter(hero.data.character))).
                    placeTo(hero.x, hero.y).
                    flip(200, [0, 1, 2]);
                //tap(() => { this.getState().onTapAlly(hero) });
                //hero.avatar = this.surface.createImage(this.context.getManifest().get(hero.data.avatar), 15, 15).hide();

                return hero;
            });
        }

        private makeCharacter(id: number): string {
            var s = id < 10 ? `0${id}` : id.toString();
            return `/character/${s}.svg`;
        }

        private initEnemy(meta: any[], force: any[]): void {
            this.enemy = ArrayUtil.collect(meta,(e) => {
                var hero = {
                    x: e.position[0],
                    y: e.position[1],
                    ref: e.ref,
                    data: force[e.ref],
                    spirit: null,
                    avatar: null
                };
                hero.spirit = this.surface.createSpirit(this.context.getManifest().get(this.makeCharacter(hero.data.character))).
                    placeTo(hero.x, hero.y).
                    flip(200, [0, 1, 2]);
                //tap(() => { this.getState().onTapAlly(hero) });
                //hero.avatar = this.surface.createImage(this.context.getManifest().get(hero.data.avatar), 15, 15).hide();

                return hero;
            });
        }

        private initMap(a: number, b: number, map: number[]): void {
            this.surface.createMap(a, b, map, this.context.getManifest().getList('/tile'));
        }

        private onTapAlly(hero): void {

        }
    }
}   
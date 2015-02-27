//module game.stage {
//    import DirectSurfaceDevice = surface.DirectSurfaceDevice;

//    export class Battlefield implements Stage {
//        public init(name: string, device: DirectSurfaceDevice): void {
//            this.surface = device.createTileSystem(this.tileWidth, this.tileHeight);
//            this.surface.enableFPS();

//            this.chapter = this.context.res.get(name);

//            this.initMap(this.chapter.map);

//            this.initAlley(this.chapter.ally, this.context.state.get('ally_force'));
//            this.initEnemy(this.chapter.enemy, this.chapter.enemy_force);

//            this.initScript(this.chapter.script);

//            this.state = [
//                new Idling(),
//                new Thinking(),
//                new Moving(),
//                new Deciding(),
//                new Battling(),
//                new Trading(),
//                new Postmortem(),
//                new ScriptAction(),
//                new EnemyAction()
//            ];
//        }
//        public start(): void {
//            BgmService.instance.playMusic('/bgm/ally.mp3');
//            this.surface.render();
//        }
//        public stop(): void {
//            this.surface.destory();
//        }

//        private initAlley(ally: any[], force: any[]): void {
//            this.ally = core.ArrayUtil.collect(ally,(e) => {
//                var hero = {
//                    x: e.position[0],
//                    y: e.position[1],
//                    ref: e.ref,
//                    data: force[e.ref],
//                    spirit: null,
//                    avatar: null
//                };
//                hero.spirit = this.surface.createSpirit(this.context.res.get(hero.data.character)).
//                    placeTo(hero.x, hero.y).
//                    flip(200, [0, 1, 2]).
//                    tap(() => { this.getState().onTapAlly(hero) });
//                hero.avatar = this.surface.createSpirit(this.context.res.get(hero.data.avatar), 2).hide();

//                return hero;
//            });
//        }

//        private onTapAlly(hero): void {

//        }
//    }
//}   
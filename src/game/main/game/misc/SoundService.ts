module game.misc {
    import Sound = audio.Sound;
    import DirectSoundDevice = audio.DirectSoundDevice;

    export class SoundService {
        private context: GameContext;
        private playingMusic: Sound;

        public constructor(context: GameContext) {
            this.context = context;
        }

        public playMusic(name: string): void {
            if (this.playingMusic != null) {
                this.playingMusic.stop();
            }
            this.playingMusic = this.get(name, true);
            this.playingMusic.play();
        }

        public playEffect(name: string): void {
            this.get(name, false).play();
        }

        private get(name: string, loop: boolean): Sound {
            return DirectSoundDevice.instance.createSound(this.context.getManifest().get(name), name, loop);
        }
    }
} 
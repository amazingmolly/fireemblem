module game.service {
    import Sound = audio.Sound;
    import DirectSoundDevice = audio.DirectSoundDevice;

    export class BgmService {
        public static instance: BgmService = new BgmService();
        private playingMusic: Sound;

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
            return DirectSoundDevice.instance.createSound(ResourceService.instance.get(name), name, loop);
        }
    }
} 
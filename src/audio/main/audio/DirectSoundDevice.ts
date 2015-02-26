/// <reference path="../../../core/main/waa.d.ts" />
/// <reference path="DirectSound.ts" />

module audio {
    export class DirectSoundDevice {
        public static instance = new DirectSoundDevice();
        private context: AudioContext;

        constructor() {
            this.context = new AudioContext();
        }

        public createSound(data: ArrayBuffer, name?: string, loop: boolean = false): Sound {
            name = name || '<unknown>';

            return new DirectSound((ready: AudioReadyCallback) => {
                this.context.decodeAudioData(data,
                    (buffer) => {
                        var source = this.context.createBufferSource(); // creates a sound source
                        source.buffer = buffer;                         // tell the source which sound to play
                        source.connect(this.context.destination);       // connect the source to the context's destination (the speakers)
                        //source.start(0);                                // play the source now
                        ready(source);
                    },
                    () => { throw new Error(`Failed to decode audio stream: ${name}`) });
            }, name, loop);
        }
    }
}
/// <reference path="Sound.ts" />

module audio {
    export interface AudioReadyCallback {
        (source: AudioBufferSourceNode): void;
    }

    export interface AudioInitCallback {
        (ready: AudioReadyCallback): void;
    }

    export class DirectSound implements Sound {
        private name: string;
        private source: AudioBufferSourceNode;
        private loop: boolean;

        public constructor(init: AudioInitCallback, name: string, loop: boolean = false) {
            this.name = name;
            this.loop = loop;
            init((source) => { this.source = source });
        }

        public play(): void {
            if (this.source == null) {
                window.setTimeout(() => { this.play() }, 100);
            } else {
                this.source.loop = this.loop;
                this.source.start(0);
            }
        }

        public stop(): void {
            if (this.source != null) {
                this.source.stop();
            }
        }
    }
}
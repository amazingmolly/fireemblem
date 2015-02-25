/// <reference path="DirectSoundDevice.ts" />

module audio {
    export class Sound {
        private device: DirectSoundDevice;
        private data: ArrayBuffer;
        private loop: boolean;

        public constructor(device: DirectSoundDevice, data: ArrayBuffer, loop: boolean = false) {
            this.device = device;
            this.data = data;
            this.loop = loop;
        }
        public play(): void {
            // TODO:
        }
        public stop(): void {
            // TODO:
        }
    }
}
module surface.spirit {
    export class Blinker {
        private enabled: boolean = false;
        private start: number = new Date().getTime();

        public enable(): void {
            this.enabled = true;
        }
        public disable(): void {
            this.enabled = false;
        }
        public tick(): boolean {
            if (!this.enabled) {
                return false;
            }

            var c = Math.floor((new Date().getTime() - this.start) % 300 / 100);
            return c == 2;
        }
    }
}  
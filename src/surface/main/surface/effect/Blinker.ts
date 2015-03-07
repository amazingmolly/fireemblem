module surface.effect {
    export class Blinker {
        private static start: number = new Date().getTime();
        private enabled: boolean = false;

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

            var c = Math.floor((new Date().getTime() - Blinker.start) % 300 / 100);
            return c == 2;
        }
    }
}  
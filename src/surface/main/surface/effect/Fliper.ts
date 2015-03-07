module surface.effect {
    export class Fliper {
        private static start: number = new Date().getTime();
        private timeout: number;
        private scope: number[];

        public constructor(timeout: number, scope: number[]) {
            this.timeout = timeout;
            this.scope = scope;
        }

        public offset(): number {
            var tt = Math.floor((new Date().getTime() - Fliper.start) / this.timeout),
                state = tt % this.scope.length,
                value = this.scope[state];

            return value;
        }
    }
}  
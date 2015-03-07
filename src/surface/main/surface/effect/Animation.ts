module surface.effect {
    import Point = core.Point;
    import Vector = core.Vector;
    import Direction = core.Direction;
    import VectorUtil = core.VectorUtil;

    export class Animation {
        private velocity: number;
        private path: Vector[];
        private head: Vector;
        private tail: Vector;

        //private previous: Vector;
        //private current: Vector;
        private prevPathIdx: number;

        private start: number = new Date().getTime();
        private done: boolean = false;
        private directionChanged: boolean = false;

        public constructor(velocity: number, path: Vector[]) {
            this.velocity = velocity / 1000;
            this.path = path;
            this.head = path[0];
            this.tail = path[path.length - 1];

            //this.previous = VectorUtil.clone(this.head);
            this.prevPathIdx = -1;
        }

        public rollback(): Point {
            return this.head;
        }

        public commit(): Point {
            return this.tail;
        }

        public getCurrentPosition(): Vector {
            var elapsed = new Date().getTime() - this.start,
                currentPathIdx = Math.floor(elapsed * this.velocity);

            if (this.prevPathIdx == -1) {
                this.prevPathIdx = currentPathIdx;
                this.directionChanged = true;
            } else {
                this.directionChanged = false;
            }

            if (currentPathIdx >= this.path.length) {
                //this.done = true;
                //return this.tail;
                currentPathIdx = this.path.length - 1;
            }

            if (currentPathIdx > this.prevPathIdx) {
                this.directionChanged = this.path[currentPathIdx].dir != this.path[this.prevPathIdx].dir;
                this.prevPathIdx = currentPathIdx;
            }

            var pos = VectorUtil.clone(this.path[currentPathIdx]),
                offset = elapsed * this.velocity - currentPathIdx;

            if (offset > 1) {
                offset = 1;
                this.done = true;
            }

            switch (pos.dir) {
                case Direction.Left:
                    pos.x += (1 - offset);
                    break;
                case Direction.Right:
                    pos.x -= (1 - offset);
                    break;
                case Direction.Up:
                    pos.y += (1 - offset);
                    break;
                case Direction.Down:
                    pos.y -= (1 - offset);
                    break;
            }

            return pos;
        }

        public isDirectionChanged(): boolean {
            return this.directionChanged;
        }

        public on(): boolean {
            return !this.done;
        }
    }
}   
/// <reference path="BasicSpirit.ts" />

module surface.spirit {
    export class FlameSpirit extends BasicSpirit {
        private width: number;
        private height: number;
        private particles: any[];

        public constructor(width: number, height: number) {
            super();

            this.width = width;
            this.height = height;
        }

        public draw(): void {
            this.context.globalCompositeOperation = "lighter";

            for (var i = 0; i < this.particles.length; i++) {
                var p = this.particles[i];

                this.context.beginPath();

                p.opacity = Math.round(p.death / p.life * 100) / 100
                var gradient = this.context.createRadialGradient(
                    p.location.x / 100 * this.context.canvas.width,
                    p.location.y / 100 * this.context.canvas.height,
                    0,
                    p.location.x / 100 * this.context.canvas.width,
                    p.location.y / 100 * this.context.canvas.height,
                    p.radius);
                gradient.addColorStop(0, "rgba(" + p.r + ", " + p.g + ", " + p.b + ", " + p.opacity + ")");
                gradient.addColorStop(0.5, "rgba(" + p.r + ", " + p.g + ", " + p.b + ", " + p.opacity + ")");
                gradient.addColorStop(1, "rgba(" + p.r + ", " + p.g + ", " + p.b + ", 0)");
                this.context.fillStyle = gradient;
                this.context.arc(
                    p.location.x / 100 * this.context.canvas.width,
                    p.location.y / 100 * this.context.canvas.height,
                    p.radius, 0, Math.PI * 2, false);
                this.context.fill();

                p.death--;
                p.radius += 2;
                p.location.x += (p.speed.x);
                p.location.y += (p.speed.y);
			
                //regenerate particles
                if (p.death < 0 || p.radius < 0) {
                    //a brand new particle replacing the dead one
                    this.particles[i] = this.regenerate();
                }
            }
        }

        private regenerate(): any {
            var particle = {
                speed: { x: -0.15 + Math.random() * 0.3, y: -3 + Math.random() * 3 },
                location: { x: 50, y: 55 },

                radius: 0.5 + Math.random() * 1,

                life: 10 + Math.random() * 10,
                death: 0,

                r: 255,
                g: Math.round(Math.random() * 155),
                b: 0
            };
            particle.death = particle.life;

            return particle;
        }

        public init(context: CanvasRenderingContext2D): Spirit {
            super.init(context);

            this.particles = [];
            for (var i = 0; i < 200; i++) {
                this.particles.push(this.regenerate());
            }
            return this;
        }
    }
} 
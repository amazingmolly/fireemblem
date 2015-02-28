/// <reference path="Storage.ts" />
/// <reference path="FileHelper.ts" />

module io {
    export interface ManifestToken {
        version: string;
        name: string;
        date: string;
        files: number;
        content: any;
    }

    export class Manifest {
        private manifest: ManifestToken;
        private artifact: Blob;
        private counter: number;
        private content: { [key: string]: any; };

        public constructor() {
            Storage.ensureQuota();
            this.content = {};
        }

        public name() {
            return this.manifest.name;
        }

        public version() {
            return this.manifest.version;
        }

        public date() {
            return this.manifest.date;
        }

        public load(manifest: ManifestToken, artifact: Blob, callback?: Function, error?: FailureCallback): void {
            this.manifest = manifest;
            this.artifact = artifact;

            this.loadContent();
            this.waitForReady(callback, error);
        }

        public loadFromCache(callback?: Function, error?: FailureCallback): void {
            // TODO:
            error(new Error('Failed to load from cache (NOT IMPL)'));
        }

        public persist(): void {
            // TODO:
        }

        public get(path: string): any {
            return this.content[path];
        }

        public getList(path: string): any[] {
            var list = [];

            for (var key in this.content) {
                if (key.indexOf(path) != -1) {
                    list.push(this.content[key]);
                }
            }

            return list;
        }

        private loadContent(): void {
            this.counter = this.manifest.files;
            this.loadOne(this.manifest.content, '');
        }

        private loadOne(root: any, path: string) {
            if (root instanceof Array) {
                var offset = (<number[]>root)[0],
                    size = (<number[]>root)[1];
                FileHelper.read(path.split('.').pop(), this.artifact, offset, size, path,
                    (path, data) => {
                        this.content[path] = data;
                        this.counter--;
                    },
                    () => { this.counter = -1; });
            } else {
                for (var name in root) {
                    var obj = root[name];
                    this.loadOne(obj, `${path}/${name}`);
                }
            }
        }

        private waitForReady(callback?: Function, error?: FailureCallback): void {
            if (this.counter < 0) {
                error(new Error('Failed to load artifact into memory'));
            } else if (this.counter > 0) {
                window.setTimeout(() => { this.waitForReady(callback, error) }, 100);
            } else {
                callback();
            }
        }
    }
}
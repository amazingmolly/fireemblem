/// <reference path="../../../core/main/filesystem.d.ts" />

module io {
    export interface BlobCallback {
        (data: Blob): void;
    }
    export interface TextCallback {
        (data: string): void;
    }
    export interface FailureCallback {
        (e: Error): void;
    }

    export class Storage {
        private static defaultMaxSizeM: number = 50;
        private static fs: FileSystem;

        public static ensureQuota(sizeM: number = Storage.defaultMaxSizeM): void {
            var webkitStorageInfo = (<any>navigator).webkitPersistentStorage,
                requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem,
                errorHandler = () => { throw new Error(`Error requesting PERSISTENT storage: ${sizeM}MB`) };

            webkitStorageInfo.requestQuota(
                sizeM * 1024 * 1024,
                (grantedBytes) => {
                    requestFileSystem(window.PERSISTENT, grantedBytes,(fs) => {
                        this.fs = fs;
                    }, errorHandler);
                }, errorHandler);
        }

        public static readAsBlob(path: string, callback?: BlobCallback, error?: FailureCallback): void {
            var errorHandler = error ? error : () => { throw new Error(`Error reading file: ${path}`) };

            this.fs.root.getFile(
                path,
                {},
                (entry: FileEntry) => {
                    entry.file(
                        (file) => {
                            if (callback) {
                                callback(file);
                            }
                        }, errorHandler);
                }, errorHandler);
        }

        public static readAsJson(path: string, callback?: TextCallback, error?: FailureCallback): void {
            this.readAsBlob(path,(data: Blob) => {
                var reader = new FileReader();

                reader.onloadend = () => {
                    if (callback) {
                        callback(reader.result);
                    }
                };
                reader.onerror = () => { throw new Error(`Error reading file: ${path}`) };

                reader.readAsText(data);
            }, error);
        }

        public static write(path: string, data: Blob|any, callback?: Function, error?: FailureCallback): void {
            var errorHandler = error ? error : () => { throw new Error(`Error writing file: ${path}`) };

            this.fs.root.getFile(
                path,
                { create: true, exclusive: true },
                (file: FileEntry) => {
                    file.createWriter((writer) => {

                        writer.onwriteend = callback;
                        writer.onerror = errorHandler;

                        if (data instanceof Blob) {
                            writer.write(data);
                        } else {
                            var blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
                            writer.write(blob);
                        }
                    }, errorHandler);
                }, errorHandler);
        }

        public static clear(callback?: Function, error?: FailureCallback): void {
            var errorHandler = error ? error : () => { throw new Error(`Error clear root dir`) };

            // TODO: how to callback?
            this.fs.root.createReader().readEntries((entries) => {
                entries.forEach((e) => e.remove(null, errorHandler));
            }, errorHandler);
        }
    }
} 
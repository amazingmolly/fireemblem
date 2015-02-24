/// <reference path="../../core/main/filesystem.d.ts" />
declare module io {
    enum ArtifactType {
        Text = 0,
        Binary = 1,
        Base64 = 2,
    }
    interface ReadCallback {
        (path: string, data: any): void;
    }
    class FileHelper {
        static read(type: ArtifactType, data: Blob, offset: number, size: number, path: string, callback: ReadCallback, error: FailureCallback): void;
    }
}
declare module io {
    interface BlobCallback {
        (data: Blob): void;
    }
    interface TextCallback {
        (data: string): void;
    }
    interface FailureCallback {
        (e: Error): void;
    }
    class Storage {
        private static defaultMaxSizeM;
        private static fs;
        static ensureQuota(sizeM?: number): void;
        static readAsBlob(path: string, callback?: BlobCallback, error?: FailureCallback): void;
        static readAsJson(path: string, callback?: TextCallback, error?: FailureCallback): void;
        static write(path: string, data: Blob | any, callback?: Function, error?: FailureCallback): void;
        static clear(callback?: Function, error?: FailureCallback): void;
    }
}
declare module io {
    interface ManifestToken {
        version: string;
        name: string;
        date: string;
        files: number;
        content: any;
    }
    class Manifest {
        private manifest;
        private artifact;
        private counter;
        private content;
        constructor();
        name(): string;
        version(): string;
        date(): string;
        load(manifest: ManifestToken, artifact: Blob, callback?: Function, error?: FailureCallback): void;
        loadFromCache(callback?: Function, error?: FailureCallback): void;
        persist(): void;
        get(path: string): any;
        getList(path: string): any[];
        private loadContent();
        private loadOne(root, path);
        private detectType(path);
        private waitForReady(callback?, error?);
    }
}

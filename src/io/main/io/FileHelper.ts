module io {

    export enum ArtifactType {
        Text,
        Binary,
        Base64
    }

    export interface ReadCallback {
        (path: string, data: any): void;
    }

    export class FileHelper {
        public static read(type: ArtifactType, data: Blob, offset: number, size: number, path: string, callback: ReadCallback, error: FailureCallback) {
            var reader = new FileReader(),
                piece = data.slice(offset, offset + size);

            reader.onerror = (e) => { error(e.error) };
            reader.onloadend = () => { callback(path, reader.result) };

            switch (type) {
                case ArtifactType.Base64:
                    reader.readAsDataURL(piece);
                    break;
                case ArtifactType.Binary:
                    reader.readAsArrayBuffer(piece);
                    break;
                case ArtifactType.Text:
                    reader.readAsText(piece);
                    break;
            }
        }
    }
} 
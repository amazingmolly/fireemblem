module io {

    export interface ReadCallback {
        (path: string, data: any): void;
    }

    enum BlobStorage {
        Text,
        Binary,
        Base64
    }

    interface ArtifactType {
        mime: string;
        type: BlobStorage;
    }

    export class FileHelper {
        public static read(extension: string, data: Blob, offset: number, size: number, path: string, callback: ReadCallback, error: FailureCallback) {
            var reader = new FileReader(),
                type = FileHelper.getArtifactType(extension),
                piece = data.slice(offset, offset + size, type.mime);

            reader.onerror = (e) => { error(e.error) };
            reader.onloadend = () => { callback(path, reader.result) };

            switch (type.type) {
                case BlobStorage.Base64:
                    reader.readAsDataURL(piece);
                    break;
                case BlobStorage.Binary:
                    reader.readAsArrayBuffer(piece);
                    break;
                case BlobStorage.Text:
                    reader.readAsText(piece);
                    break;
            }
        }

        private static getArtifactType(extension: string): ArtifactType {
            switch (extension) {
                case 'mp3':
                    return { mime: 'audio/mp3', type: BlobStorage.Binary };
                case 'js':
                    return { mime: 'application/javascript', type: BlobStorage.Text };
                case 'json':
                    return { mime: 'application/json', type: BlobStorage.Text };
                case 'png':
                    return { mime: 'image/png', type: BlobStorage.Base64 };
                case 'jpg':
                    return { mime: 'image/jpeg', type: BlobStorage.Base64 };
                case 'svg':
                    return { mime: 'image/svg+xml', type: BlobStorage.Base64 };
                default:
                    throw new Error(`Unknown extension: ${extension}`);
            }
        }
    }
} 
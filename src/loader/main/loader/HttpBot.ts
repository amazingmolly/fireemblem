module loader {
    export interface HttpBotEvent {
        // target uri
        target: string;
        // total size of the file
        total?: number;
        // downloaded size of the current timestamp
        loaded?: number;
        // elapsed time in milliseconds
        elapsed?: number;
        // downloaded object (depends on type)
        data?: any;
        // error
        error?: Error;
    }

    export interface HttpBotCallback {
        (e: HttpBotEvent): void;
    }

    interface HttpBotTarget {
        uri: string;
        type: string;
    }

    export class HttpBot {
        private progressCallback: HttpBotCallback;
        private doneCallback: HttpBotCallback;
        private errorCallback: HttpBotCallback;
        private started: boolean = false;
        private queue: HttpBotTarget[] = [];

        public progress(callback: HttpBotCallback): HttpBot {
            this.progressCallback = callback;
            return this;
        }
        public done(callback: HttpBotCallback): HttpBot {
            this.doneCallback = callback;
            return this;
        }
        public error(callback: HttpBotCallback): HttpBot {
            this.errorCallback = callback;
            return this;
        }
        public get(uri: string, type: string): HttpBot {
            this.queue.push({ uri: uri, type: type });
            if (!this.started) {
                this.startDownload();
            }
            return this;
        }

        private startDownload(): void {
            if (this.queue.length == 0)
                return;

            this.started = true;

            var target = this.queue.pop(),
                ajax = new XMLHttpRequest();

            // https://developer.mozilla.org/zh-TW/docs/DOM/XMLHttpRequest#responseType
            ajax.open('GET', target.uri, true);
            ajax.responseType = target.type;

            ajax.onload = () => {
                if (this.doneCallback != null) {
                    this.doneCallback({
                        target: target.uri,
                        data: ajax.response
                    });
                }
            };

            ajax.onloadend = () => {
                this.started = false;
                this.startDownload();
            };

            if (this.progressCallback != null) {
                ajax.onprogress = (e) => {
                    //if (e.lengthComputable) {
                    //} else {
                    //    // Unable to compute progress information since the total size is unknown
                    //}
                    this.progressCallback({
                        target: target.uri,
                        loaded: e.loaded,
                        total: e.total
                    });
                };
            }

            if (this.errorCallback != null) {
                ajax.onerror = (e) => {
                    this.errorCallback({
                        target: target.uri,
                        error: e.error
                    });
                };
            }

            ajax.send();
        }
    }
} 
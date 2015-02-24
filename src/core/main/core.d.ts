declare module core {
    class Logger {
        info(msg: string): void;
        warn(msg: string): void;
        debug(msg: string): void;
        error(msg: string, e?: Error): void;
        fatal(msg: string, e?: Error): void;
    }
}

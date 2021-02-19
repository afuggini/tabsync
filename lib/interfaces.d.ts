export interface TabSyncProps {
    channelName: string;
    id: string;
    onInit?: (id: string) => void;
    onKill?: (id: string) => void;
    onPrune?: (id: string) => void;
    pingInterval?: number;
    workerPath: string;
}
declare type MessageType = 'init' | 'kill' | 'ping' | 'prune';
export interface TabSyncMessage {
    id: string;
    type: MessageType;
}
export interface TabSyncWorkerProps {
    channelName: string;
    maxAge?: number;
    pruneInterval?: number;
}
export {};

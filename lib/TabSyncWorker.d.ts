import { TabSyncMessage, TabSyncWorkerProps } from './interfaces';
declare class TabSyncWorker {
    private index;
    private publicChannel;
    private maxAge;
    constructor({ channelName, maxAge, pruneInterval, }: TabSyncWorkerProps);
    initialize(): void;
    onConnect(event: MessageEvent): void;
    onMessage(event: MessageEvent<TabSyncMessage>): void;
    prune(): void;
}
export default TabSyncWorker;

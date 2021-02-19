import { TabSyncProps } from './interfaces';
declare class TabSync {
    id: string;
    worker: SharedWorker;
    publicChannel: BroadcastChannel;
    constructor({ channelName, id, onInit, onKill, onPrune, pingInterval, workerPath, }: TabSyncProps);
    private message;
    private ping;
    private kill;
}
export default TabSync;

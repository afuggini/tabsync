import { TabSyncMessage, TabSyncProps } from './interfaces';

class TabSync {
  public id: string;
  public worker: SharedWorker;
  public publicChannel: BroadcastChannel;

  constructor({
    channelName,
    id,
    onInit,
    onKill,
    onPrune,
    pingInterval = 1000,
    workerPath,
  }: TabSyncProps) {
    const publicChannel = new BroadcastChannel(channelName);
    publicChannel.addEventListener(
      'message',
      (event: MessageEvent<TabSyncMessage>) => {
        const { data } = event;
        switch (data.type) {
          case 'init':
            onInit?.(data.id);
            break;
          case 'kill':
            onKill?.(data.id);
            break;
          case 'prune':
            onPrune?.(data.id);
            break;
          default:
            break;
        }
      },
    );

    const worker = new SharedWorker(workerPath);
    worker.port.start();
    worker.port.postMessage({ id, type: 'init' });

    this.id = id;
    this.worker = worker;
    this.publicChannel = publicChannel;

    setInterval(this.ping.bind(this), pingInterval);
    addEventListener('beforeunload', this.kill.bind(this));
  }

  private message(type: string): void {
    this.worker.port.postMessage({ id: this.id, type });
  }

  private ping(): void {
    this.message('ping');
  }

  private kill(): void {
    this.message('kill');
  }
}

export default TabSync;

import { TabSyncMessage, TabSyncWorkerProps } from './interfaces';

class TabSyncWorker {
  private index: {
    [id: string]: number;
  };
  private publicChannel: BroadcastChannel;
  private maxAge: number;

  constructor({
    channelName,
    maxAge = 3000,
    pruneInterval = 5000,
  }: TabSyncWorkerProps) {
    this.index = {};
    this.maxAge = maxAge;
    this.publicChannel = new BroadcastChannel(channelName);

    this.initialize();
    setInterval(this.prune.bind(this), pruneInterval);
  }

  initialize(): void {
    // Find a better solution than casting to EventListener
    addEventListener('connect', this.onConnect.bind(this) as EventListener);
  }

  onConnect(event: MessageEvent): void {
    const port = event.ports[0];
    port.addEventListener('message', this.onMessage.bind(this));
    port.start();
  }

  onMessage(event: MessageEvent<TabSyncMessage>): void {
    const { data } = event;
    const { id, type } = data;
    const { index, publicChannel } = this;
    switch (type) {
      case 'init':
        index[id] = Date.now();
        publicChannel.postMessage({ id, type });
        break;
      case 'kill':
        delete index[id];
        publicChannel.postMessage({ id, type });
        break;
      case 'ping':
        index[id] = Date.now();
        break;
      default:
        break;
    }
  }

  prune(): void {
    const maxTime = Date.now() - this.maxAge;
    const pruneIds = Object.keys(this.index).filter(
      (id) => this.index[id] < maxTime,
    );
    if (!pruneIds.length) return;
    pruneIds.forEach((id) => {
      delete this.index[id];
      const message: TabSyncMessage = { id, type: 'prune' };
      this.publicChannel.postMessage(message);
    });
  }
}

export default TabSyncWorker;

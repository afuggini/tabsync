"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TabSync {
    constructor({ channelName, id, onInit, onKill, onPrune, pingInterval = 1000, workerPath, }) {
        const publicChannel = new BroadcastChannel(channelName);
        publicChannel.addEventListener('message', (event) => {
            const { data } = event;
            switch (data.type) {
                case 'init':
                    onInit === null || onInit === void 0 ? void 0 : onInit(data.id);
                    break;
                case 'kill':
                    onKill === null || onKill === void 0 ? void 0 : onKill(data.id);
                    break;
                case 'prune':
                    onPrune === null || onPrune === void 0 ? void 0 : onPrune(data.id);
                    break;
                default:
                    break;
            }
        });
        const worker = new SharedWorker(workerPath);
        worker.port.start();
        worker.port.postMessage({ id, type: 'init' });
        this.id = id;
        this.worker = worker;
        this.publicChannel = publicChannel;
        setInterval(this.ping.bind(this), pingInterval);
        addEventListener('beforeunload', this.kill.bind(this));
    }
    message(type) {
        this.worker.port.postMessage({ id: this.id, type });
    }
    ping() {
        this.message('ping');
    }
    kill() {
        this.message('kill');
    }
}
exports.default = TabSync;
//# sourceMappingURL=TabSync.js.map
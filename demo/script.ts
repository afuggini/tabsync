import TabSync from '../src/';
import { randomId } from '../src/helpers';

new TabSync({
  channelName: 'demo-project',
  id: randomId(),
  workerPath: './worker.js',
  onInit: (data) => {
    console.log(`Tab initialized:`, data);
  },
  onKill: (data) => {
    console.log(`Tab killed:`, data);
  },
  onPrune: (data) => {
    console.log(`Tab pruned:`, data);
  },
});

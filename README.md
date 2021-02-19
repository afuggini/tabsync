# @afuggini/tabsync

[![GitHub license](https://img.shields.io/github/license/afuggini/tabsync)](https://github.com/afuggini/tabsync/blob/master/LICENSE)

Allows browser tabs to be aware of other open tabs.

## Usage

Create a shared worker:

```javascript
// worker.js
import { TabSyncWorker } from '@afuggini/tabsync';

new TabSyncWorker({ channelName: 'demo-project' });
```

Instance the `TabSync` class to communicate with the worker:

```javascript
import TabSync from '@afuggini/tabsync';

new TabSync({
  // Same name as in the worker
  channelName: 'demo-project',

  // Unique ID for each tab
  id: randomId(),

  // How often to ping the worker to report tab is alive (defaults to 1000)
  pingInterval: 1000,

  // Path to the worker.js file created before
  workerPath: './worker.js',

  // Called every time a new tab is opened, including the current one (optional)
  onInit: (data) => {
    console.log(`Tab initialized:`, data);
  },

  // Called when a tab is closed by the user (optional)
  onKill: (data) => {
    console.log(`Tab killed:`, data);
  },

  // Called when the tab has crashed or closed unexpectedly (optional)
  onPrune: (data) => {
    console.log(`Tab pruned:`, data);
  },
});
```

## Demo

A demo implementation can be found in the `/demo` directory.

To run locally:

1. Run `yarn dev`
2. Open http://localhost:1234/index.html
3. Open multiple tabs and inspect the Dev Tools console

## License

MIT

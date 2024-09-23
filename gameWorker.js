// gameWorker.js
self.onmessage = function(event) {
    const gameState = event.data;
    self.postMessage(gameState);
};

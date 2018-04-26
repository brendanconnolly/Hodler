let forever = require('forever');

var hodler = new (forever.Monitor)('index.js', {
    max: 3,
    silent: false,
    args: []
});

hodler.on('exit', function () {
    console.log('index.js.js has exited after 3 restarts');
});

hodler.start();
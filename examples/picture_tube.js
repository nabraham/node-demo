var fs = require('fs')
  , pictureTube = require('picture-tube');

var tube = pictureTube();
tube.pipe(process.stdout);

fs.createReadStream('nodejs.png').pipe(tube);

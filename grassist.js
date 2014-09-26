var lawn = require('./lib/lawn.js')(["XXXXX", "X !!X", "X %!X", "XXXXX"], 1, 2);
var lawnmower = require('./lib/lawnmower.js')(lawn);

lawnmower.startRotor();
lawnmower.moveForward();
lawnmower.moveForward();
lawnmower.turnRight();
console.log(lawn.freshlyCut());
lawnmower.moveForward();
console.log(lawn.freshlyCut());
lawnmower.stopRotor();
lawnmower.turnRight();
lawnmower.moveForward();
lawnmower.moveForward();
lawnmower.turnRight();
lawnmower.moveForward();


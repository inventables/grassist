var yard = require('./lib/yard.js')(["XXXXX", "X !!X", "X %!X", "XXXXX"], 1, 2);
var lawnmower = require('./lib/lawnmower.js')(yard);

lawnmower.startRotor();
lawnmower.moveForward();
lawnmower.moveForward();
lawnmower.turnRight();
console.log(yard.freshlyCut());
lawnmower.moveForward();
console.log(yard.freshlyCut());
lawnmower.stopRotor();
lawnmower.turnRight();
lawnmower.moveForward();
lawnmower.moveForward();
lawnmower.turnRight();
lawnmower.moveForward();


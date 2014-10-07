GRASSIST.lawnmower = function(yard) {
  var that = {};

  var EAST = 0, NORTH = 1, WEST = 2, SOUTH = 3; // in order counter-clockwise
  var HEADINGS = ['east', 'north', 'west', 'south'];
  var LONGITUDE_STEPS = [1, 0, -1, 0], LATITUDE_STEPS = [0, 1, 0, -1];

  var heading = EAST;
  var longitude = 0, latitude = 0;
  var rotorEnabled = false;

  var rotorStarted = 0;
  var gasConsumed = 0;
  var pushedDistance = 0;

  var process = function() {
    yard.processLawnmower(longitude, latitude, rotorEnabled);
  };

  var startRotor = function() {
    rotorEnabled = true;
    rotorStarted += 1;
    process();
  };

  var stopRotor = function() {
    rotorEnabled = false;
    process();
  };

  var moveForward = function() {
    longitude = longitude + LONGITUDE_STEPS[heading];
    latitude = latitude + LATITUDE_STEPS[heading];

    if (rotorEnabled) {
      gasConsumed += 1;
    } else {
      pushedDistance += 1;
    }

    process();
  };

  var turnLeft = function() {
    heading = (heading + 1) % 4;
  };

  var turnRight = function() {
    heading = (heading + 3) % 4;
  };

  var position = function() {
    return [longitude, latitude];
  };

  var heading = function() {
    return HEADINGS[heading];
  };

  var rotorEnabled = function() {
    return rotorEnabled;
  };

  var home = function() {
    return (longitude === 0 && latitude === 0);
  };

  var stats = function() {
    return {
      rotorStarted: rotorStarted,
      gasConsumed: gasConsumed,
      pushedDistance: pushedDistance
    }
  };

  that.startRotor = startRotor;
  that.stopRotor = stopRotor;
  that.moveForward = moveForward
  that.turnLeft = turnLeft;
  that.turnRight = turnRight;
  that.position = position;
  that.heading = heading;
  that.home = home;
  that.rotorEnabled = rotorEnabled;
  that.stats = stats;

  return that;
};

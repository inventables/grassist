GRASSIST.lawnmower = function(yard) {
  var that = {};

  var EAST = 0, NORTH = 1, WEST = 2, SOUTH = 3; // in order counter-clockwise
  var HEADINGS = ['east', 'north', 'west', 'south'];
  var LONGITUDE_STEPS = [1, 0, -1, 0], LATITUDE_STEPS = [0, 1, 0, -1];

  var heading = EAST;
  var longitude = 0, latitude = 0;
  var rotorEnabled = false;

  var process = function() {
    yard.processLawnmower(longitude, latitude, rotorEnabled);
  };

  var startRotor = function() {
    rotorEnabled = true;
    process();
    return that;
  };

  var stopRotor = function() {
    rotorEnabled = false;
    process();
    return that;
  };

  var moveForward = function() {
    longitude = longitude + LONGITUDE_STEPS[heading];
    latitude = latitude + LATITUDE_STEPS[heading];
    process();
    return that;
  };

  var turnLeft = function() {
    heading = (heading + 1) % 4;
    return that;
  };

  var turnRight = function() {
    heading = (heading + 3) % 4;
    return that;
  };

  var getPosition = function() {
    return [longitude, latitude];
  };

  var getHeading = function() {
    return HEADINGS[heading];
  };

  var isRotorEnabled = function() {
    return rotorEnabled;
  };

  var isHome = function() {
    return (longitude === 0 && latitude === 0);
  };

  that.startRotor = startRotor;
  that.stopRotor = stopRotor;
  that.moveForward = moveForward
  that.turnLeft = turnLeft;
  that.turnRight = turnRight;
  that.position = getPosition;
  that.heading = getHeading;
  that.rotorEnabled = isRotorEnabled;
  that.home = isHome;

  return that;
};

var lawnmower = function(lawn) {
  var that = {};

  var EAST = 0, NORTH = 1, WEST = 2, SOUTH = 3; // in order counter-clockwise
  var HEADINGS = ['east', 'north', 'west', 'south'];
  var LONGITUDE_STEPS = [1, 0, -1, 0], LATITUDE_STEPS = [0, 1, 0, -1];

  var heading = EAST;
  var longitude = 0, latitude = 0;
  var rotorEnabled = false;

  var process = function() {
    lawn.processLawnmower(longitude, latitude, rotorEnabled);
  };

  that.startRotor = function() {
    rotorEnabled = true;
    process();
  };

  that.stopRotor = function() {
    rotorEnabled = false;
    process();
  };

  that.moveForward = function() {
    longitude = longitude + LONGITUDE_STEPS[heading];
    latitude = latitude + LATITUDE_STEPS[heading];
    process();
  };

  that.turnLeft = function() {
    heading = (heading + 1) % 4;
  };

  that.turnRight = function() {
    heading = (heading + 3) % 4;
  };

  that.position = function() {
    return [longitude, latitude];
  };

  that.heading = function() {
    return HEADINGS[heading];
  };

  that.rotorEnabled = function() {
    return rotorEnabled;
  };

  return that;
};

module.exports = lawnmower;

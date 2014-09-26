var lawnmower = function() {
  var that = {};

  var EAST = 0, NORTH = 1, WEST = 2, SOUTH = 3; // in order counter-clockwise
  var HEADINGS = ['east', 'north', 'west', 'south'];

  var heading = EAST;
  var longitude = 0, latitude = 0;
  var rotorEnabled = false;

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
}();

module.exports = lawnmower;

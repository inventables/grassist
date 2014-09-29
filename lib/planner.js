GRASSIST.planner = function() {
  var that = {};

  that.plan = function(lawnmower, yard) {
    lawnmower.startRotor();
    lawnmower.stopRotor();
  };

  return that;
};

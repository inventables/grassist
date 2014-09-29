GRASSIST.planner = function() {
  var that = {};

  var plan = function(lawnmower, yard) {
    lawnmower.startRotor();
    lawnmower.stopRotor();
  };

  that.plan = plan;

  return that;
};

GRASSIST.planner = function() {
  var that = {};

  var plan = function(lawnmower, yard) {
    lawnmower.startRotor()
      .stopRotor();
  };

  that.plan = plan;

  return that;
};

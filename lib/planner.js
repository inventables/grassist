GRASSIST.planner = function() {
  var that = {};

  var plan = function(lawnmower, yard) {
    lawnmower.startRotor()
      .turnLeft()
      .turnLeft()
      .turnLeft()
      .turnLeft()
      .stopRotor();
  };

  that.plan = plan;

  return that;
};

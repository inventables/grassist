GRASSIST.planner = function() {
  var that = {};

  var plan = function(lawnmower, yard) {
    lawnmower.startRotor()
      .turnLeft()
      .moveForward()
      .turnRight()
      .turnRight()
      .moveForward()
      .stopRotor();
  };

  that.plan = plan;

  return that;
};

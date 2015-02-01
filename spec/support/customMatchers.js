var Yard = require.requireActual('../../lib/yard');
var Lawnmower = require.requireActual('../../lib/lawnmower');

var mowMatcher = {
  toMow: function(patches, homeLongitude, homeLatitude) {
    var planner = this.actual;
    var yard = Yard(patches, homeLongitude, homeLatitude);
    var mower = Lawnmower(yard);
    var messages = [];
    planner.plan(mower, yard);
    if (!yard.freshlyCut()) {
      messages.push("Expected planner to cut the whole yard");
    }
    var position = mower.position();
    if (position[0] !== 0 || position[1] !== 0) {
      messages.push("Expected the lawnmower to be returned to its home position");
    };
    if (mower.rotorEnabled()) {
      messages.push("Expected the lawnmower's rotor to be powered off");
    }

    this.message = function() {
      return messages.join(", ");
    };

    return messages.length === 0
  }
};

jasmine.getEnv().beforeEach(function () {
  this.addMatchers(mowMatcher);
});

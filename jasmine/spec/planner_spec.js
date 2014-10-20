describe("planner", function() {
  var planner;

  var testMax = function(maximum, tested) {
    return maximum !== undefined && maximum > tested;
  };

  var mowMatcher = {
    toMow: function() {
      return {
        compare: function(planner, params) {
          var yard = GRASSIST.yard(params.patches, params.homeLongitude, params.homeLatitude);
          var mower = GRASSIST.lawnmower(yard);
          var messages = [];
          planner.plan(mower, yard);

          var position = mower.position();
          var stats = mower.stats();

          if (!yard.freshlyCut()) {
            messages.push("Expected planner to cut the whole yard");
          }

          if (position[0] !== 0 || position[1] !== 0) {
            messages.push("Expected the lawnmower to be returned to its home position");
          }

          if (mower.rotorEnabled()) {
            messages.push("Expected the lawnmower's rotor to be powered off");
          }

          if (testMax(params.maxRotorStart, stats.rotorStarted)) {
            messages.push("Expected mower to start no more than" + params.maxRotorStart + " times, got " + stats.rotorStarted);
          }

          if (testMax(params.maxPushedDistance, stats.pushedDistance)) {
            messages.push("Expected mower to be pushed no more than " + params.maxPushedDistance + " units, got " + stats.pushedDistance);
          }

          if (testMax(params.maxGasConsumed, stats.gasConsumed)) {
            messages.push("Expected mower to use no more than " + params.maxGasConsumed + " units of gas, got " + stats.gasConsumed);
          }

          return {
            pass: messages.length === 0,
            message: messages.join(", ")
          };
        }
      };
    }
  };

  beforeEach(function() {
    jasmine.addMatchers(mowMatcher);
    planner = GRASSIST.planner();
  });

  // ! long grass
  // . short grass
  //   sidewalk
  // % mulch or gravel
  // X plant or flower

  it("should mow a tiny yard", function() {
    var patches = [
      "!"
    ];
    expect(planner).toMow({
      patches: patches,
      homeLongitude: 0,
      homeLatitude: 0
    });
  });

  it("should mow a small yard", function() {
    var patches = [
      "!!!",
      "!!!"
    ];
    expect(planner).toMow({
      patches: patches,
      homeLongitude: 0,
      homeLatitude: 0
    });
  });

  it("should mow a small yard with at most 6 units of gas", function() {
    var patches = [
      "!!!",
      "!!!"
    ];
    expect(planner).toMow({
      patches: patches,
      homeLongitude: 0,
      homeLatitude: 0,
      maxGasConsumed: 6
    });
  });

  it("should mow a large yard", function() {
    var patches = [
      "!!!!!!!!",
      "!!!!!!!!",
      "!!!!!!!!",
      "!!!!!!!!"
    ];
    expect(planner).toMow({
      patches: patches,
      homeLongitude: 0,
      homeLatitude: 0
    });
  });

  it("should mow a large yard without turning off the rotor", function() {
    var patches = [
      "!!!!!!!!",
      "!!!!!!!!",
      "!!!!!!!!",
      "!!!!!!!!"
    ];
    expect(planner).toMow({
      patches: patches,
      homeLongitude: 0,
      homeLatitude: 0,
      maxRotorStart: 1
    });
  });

  it("should avoid gravel when the rotor is enabled", function() {
    var patches = [
      "!!!!%!!!!",
      "!!!!%!!!!",
      "%%%%%%%%%",
      "!!!!%!!!!",
      "!!!!%!!!!"
    ];
    expect(planner).toMow({
      patches: patches,
      homeLongitude: 0,
      homeLatitude: 4
    });
  });

  it("should pass over sidewalks to minimize rotor start count", function() {
    var patches = [
      "!!!!%!!!!",
      "!!!!%!!!!",
      "%%%%%%%%%",
      "!!!!%!!!!",
      "!!!!%!!!!"
    ];
    expect(planner).toMow({
      patches: patches,
      homeLongitude: 0,
      homeLatitude: 4,
      maxRotorStart: 2
    });
  });

  it("should avoid passing over a flower bed", function() {
    var patches = [
      "!XXXXXX!",
      "!!XXXX!!",
      "!!!!!!!!",
      "!!!!!!!!",
      "!!!!!!!!"
    ];
    expect(planner).toMow({
      patches: patches,
      homeLongitude: 4,
      homeLatitude: 0
    });
  });

  it("should mow a complicated yard", function() {
    var patches = [
      "XXXXXXXXXXXXX",
      "XXXX!!!!!!!!X",
      "XXX!!!!X!!!!X",
      "XX!!!!!!!!!!X",
      " !!!!!!!!!!XX",
      " !!!!!!!%%%%%",
      " !!!!!!%%%%%%",
      "  !!!!%%%%%%%",
      "             "
    ];
    expect(planner).toMow({
      patches: patches,
      homeLongitude: 0,
      homeLatitude: 0
    });
  });
});

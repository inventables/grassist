describe("planner", function() {
  var planner;

  var mowMatcher = {
    toMow: function() {
      return {
        compare: function(planner, patches, homeLongitude, homeLatitude) {
          var yard = GRASSIST.yard(patches, homeLongitude, homeLatitude);
          var mower = GRASSIST.lawnmower();
          mower.onUpdate(yard.processLawnmower);
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
    expect(planner).toMow(patches, 0, 0);
  });

  it("should mow a small yard", function() {
    var patches = [
      "!!!",
      "!!!"
    ];
    expect(planner).toMow(patches, 0, 0);
  });

  it("should mow a large yard", function() {
    var patches = [
      "!!!!!!!!",
      "!!!!!!!!",
      "!!!!!!!!",
      "!!!!!!!!"
    ];
    expect(planner).toMow(patches, 0, 0);
  });

  it("should avoid gravel when the rotor is enabled", function() {
    var patches = [
      "!!!!%!!!!",
      "!!!!%!!!!",
      "%%%%%%%%%",
      "!!!!%!!!!",
      "!!!!%!!!!"
    ];
    expect(planner).toMow(patches, 0, 4);
  });

  it("should avoid passing over a flower bed", function() {
    var patches = [
      "!XXXXXX!",
      "!!XXXX!!",
      "!!!!!!!!",
      "!!!!!!!!",
      "!!!!!!!!"
    ];
    expect(planner).toMow(patches, 4, 0);
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
    expect(planner).toMow(patches, 0, 0);
  });
});


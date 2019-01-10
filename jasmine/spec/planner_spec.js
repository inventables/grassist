describe("planner", function() {
  var planner;

  var mowMatcher = {
    toMow: function() {
      return {
        compare: function(planner, patches, homeLongitude, homeLatitude) {
          var yard = GRASSIST.yard(patches);
          var mower = GRASSIST.lawnmower(homeLongitude, homeLatitude);
          mower.onUpdate(yard.processLawnmower);
          var messages = [];
          planner.plan(mower, yard);
          if (!yard.freshlyCut()) {
            messages.push("Expected planner to cut the whole yard");
          }
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

  // Change 'xit' -> 'it' to test flower-bed avoidance
  xit("should avoid passing over a flower bed", function() {
    var patches = [
      "       ",
      "  !!!  ",
      " !!X!! ",
      "  !!!  ",
      "       "
    ];
    expect(planner).toMow(patches, 0, 0);
  });

  // Change 'xit' -> 'it' to test gravel avoidance
  xit("should avoid gravel when the rotor is enabled", function() {
    var patches = [
      "!!!!%!!!!",
      "!!!!%!!!!",
      "%%%%%%%%%",
      "!!!!%!!!!",
      "!!!!%!!!!"
    ];
    expect(planner).toMow(patches, 4, 0);
  });

  // Change 'xit' -> 'it' to test this complicated yard
  xit("should mow a complicated yard", function() {
    var patches = [
      "!!!!!!!!!!!!!!",
      "!X!!X!!XXXXXX!",
      "!X!!X!!!!!!!!!",
      "!X!!X!!!!!X!!!",
      "!X!!X!!!X!X!!!",
      "!!!XX!!!X!!!!!",
      "!!!!!!!X!!XXX!",
      "!XX!!!!X!!!!X!",
      "!!!!!!!!!!!!!!"
    ];
    expect(planner).toMow(patches, 0, 4);
  });

  // Change 'xit' -> 'it' to test this shape
  xit("should mow a smiling easel", function() {
    var patches = [
      "          XX        ",
      "    XXXXXXXXXXXXXX  ",
      "    X!!!!!!!!!!!!X  ",
      "    X!!!XX!!XX!!!X  ",
      "    X!!!XX!!XX!!!X  ",
      "    X!!!!!!!!!!!!X  ",
      "X X X!X!!!!!!!!X!X  ",
      " X  X!!X!!!!!!X!!X  ",
      "XXX X!!!XXXXXX!!!X  ",
      "   XX!!!!!!!!!!!!X  ",
      "    XXXXXXXXXXXXXX  ",
      "      XX      XX    ",
      "     XXXXXXXXXXXX   ",
      "     XX        XX   "
    ];
    expect(planner).toMow(patches, 5, 4);
  });
});

jest.dontMock('../lib/planner');

var Planner = require('../lib/planner');

describe("planner", function() {
  var planner;

  beforeEach(function() {
    planner = Planner();
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

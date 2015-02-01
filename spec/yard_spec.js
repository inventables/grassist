jest.dontMock('../lib/yard');

describe("yard", function() {
  // ! long grass
  // . short grass
  //   sidewalk
  // % mulch or gravel
  // X plant or flower
  var Yard = require('../lib/yard');

  describe("freshlyCut", function() {
    it("returns true if there is no long grass", function() {
      var patches = [
        ".% ",
        "XX."
      ];
      yard = Yard(patches, 0, 0);
      expect(yard.freshlyCut()).toBe(true);
    });

    it("returns false if there is any long grass", function() {
      var patches = [
        " .!",
        "%XX"
      ];
      yard = Yard(patches, 0, 0);
      expect(yard.freshlyCut()).toBe(false);
    });
  });

  describe("bounds", function() {
    it("returns the extrema relative to the home position", function() {
      var patches = [
        ".....",
        ".....",
        "....."
      ];
      yard = Yard(patches, 1, 0);
      bounds = yard.bounds();

      expect(bounds[0]).toBe(-1)
      expect(bounds[1]).toBe(0)
      expect(bounds[2]).toBe(3)
      expect(bounds[3]).toBe(2)
    });
  });

  describe("patchType", function() {
    it("returns the appropriate patch type", function() {
      var patches = [
        "!. %X",
        "!. %X",
        "!. %X"
      ];
      yard = Yard(patches, 0, 0);

      expect(yard.patchType(0,0)).toBe("long_grass");
      expect(yard.patchType(1,0)).toBe("short_grass");
      expect(yard.patchType(2,1)).toBe("sidewalk");
      expect(yard.patchType(3,1)).toBe("mulch_gravel");
      expect(yard.patchType(4,2)).toBe("plant_flower");
    })
  });

  describe("patchType", function() {
    it("returns the appropriate patch type", function() {
      var patches = [
        "!. %X",
        "!. %X",
        "!. %X"
      ];
      yard = Yard(patches, 0, 0);

      expect(yard.patchType(0,0)).toBe("long_grass");
      expect(yard.patchType(1,0)).toBe("short_grass");
      expect(yard.patchType(2,1)).toBe("sidewalk");
      expect(yard.patchType(3,1)).toBe("mulch_gravel");
      expect(yard.patchType(4,2)).toBe("plant_flower");
    })
  });
});
//

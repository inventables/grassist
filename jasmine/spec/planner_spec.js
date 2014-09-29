describe("planner", function() {
  var planner;

  beforeEach(function() {
    planner = GRASSIST.planner();
  });

  it("should mow a tiny yard", function() {
    var yard = GRASSIST.yard(["!"], 0, 0);
    var mower = GRASSIST.lawnmower(yard);
    planner.plan(mower, yard);
    expect(yard.freshlyCut()).toBe(true);
    expect(mower.rotorEnabled()).toBe(false);
    expect(mower.position()).toEqual([0, 0]);
  });
});

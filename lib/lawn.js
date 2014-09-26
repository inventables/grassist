var lawn = function(patchStrings, homeLongitude, homeLatitude) {
  var that = {};

  var LONG_GRASS = 0, SHORT_GRASS = 1, SIDEWALK = 2, MULCH_GRAVEL = 3, PLANTS_FLOWERS = 4;
  var CHARACTERS = {'!': LONG_GRASS, '.': SHORT_GRASS, ' ': SIDEWALK, '%': MULCH_GRAVEL, 'X': PLANTS_FLOWERS};

  var patches = [];
  for (var stringIndex in patchStrings) {
    var latitudeString = patchStrings[stringIndex];
    var latitudePatches = [];
    for (characterIndex in latitudeString) {
      var patchCharacter = latitudeString[characterIndex];
      var patchType = CHARACTERS[patchCharacter];
      if (typeof patchType === 'number') {
        latitudePatches.push(patchType);
      } else {
        throw 'Invalid patch type: ' + patchCharacter;
      }
    }
    patches.unshift(latitudePatches);
  }

  that.patchType = function(longitude, latitude) {
    return patches[homeLatitude + latitude][homeLongitude + longitude];
  };

  that.bounds = function() {
    return [0 - homeLongitude, 0 - homeLatitude, patches[0].length - 1 - homeLongitude, patches.length - 1 - homeLatitude];
  };

  return that;
};

module.exports = lawn;

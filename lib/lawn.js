var lawn = function(patchStrings) {
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
    return patches[latitude][longitude];
  };

  return that;
};

module.exports = lawn;

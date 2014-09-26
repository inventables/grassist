var lawn = function(patchStrings, homeLongitude, homeLatitude) {
  var that = {};

  var LONG_GRASS = 0, SHORT_GRASS = 1, SIDEWALK = 2, MULCH_GRAVEL = 3, PLANT_FLOWER = 4;
  var PATCH_TYPES = ['long_grass', 'short_grass', 'sidewalk', 'mulch_gravel', 'plant_flower'];
  var CHARACTERS = {'!': LONG_GRASS, '.': SHORT_GRASS, ' ': SIDEWALK, '%': MULCH_GRAVEL, 'X': PLANT_FLOWER};

  var patches = [];
  var longGrassPatchCount = 0;

  for (var stringIndex in patchStrings) {
    var latitudeString = patchStrings[stringIndex];
    var latitudePatches = [];
    for (characterIndex in latitudeString) {
      var patchCharacter = latitudeString[characterIndex];
      var patchType = CHARACTERS[patchCharacter];
      if (typeof patchType === 'number') {
        if (patchType === LONG_GRASS) {
          ++longGrassPatchCount;
        }
        latitudePatches.push(patchType);
      } else {
        throw 'Invalid patch type: ' + patchCharacter;
      }
    }
    patches.unshift(latitudePatches);
  }

  var processLawnmower = function(longitude, latitude, rotorEnabled) {
    var patchType = getPatchType(longitude, latitude);
    processTrampling(longitude, latitude);
    if (rotorEnabled) {
      processCutting(longitude, latitude);
    }
  };

  var processTrampling = function(longitude, latitude) {
    var bounds = getBounds();
    var minLongitude = bounds[0], minLatitude = bounds[1], maxLongitude = bounds[2], maxLatitude = bounds[3];
    if (minLongitude <= longitude && longitude <= maxLongitude && minLatitude <= latitude && latitude <= maxLatitude) {
      switch (getPatchType(longitude, latitude)) {
        case PLANT_FLOWER:
          throw 'Ran into a plant! ' + longitude + ', ' + latitude;
          break;
      }
    } else {
      throw 'Ran outside the bounds of the yard! ' + longitude + ', ' + latitude;
    }
  };

  var processCutting = function(longitude, latitude) {
    switch (getPatchType(longitude, latitude)) {
      case LONG_GRASS:
        setPatchType(longitude, latitude, SHORT_GRASS);
        --longGrassPatchCount;
        break;
      case MULCH_GRAVEL:
        throw 'Ran over mulch or gravel with the rotor on! ' + longitude + ', ' + latitude;
        break;
    }
  };

  var getPatchType = function(longitude, latitude) {
    return patches[homeLatitude + latitude][homeLongitude + longitude];
  };

  var setPatchType = function(longitude, latitude, patchType) {
    patches[homeLatitude + latitude][homeLongitude + longitude] = patchType;
  };

  var getBounds = function() {
    return [0 - homeLongitude, 0 - homeLatitude, patches[0].length - 1 - homeLongitude, patches.length - 1 - homeLatitude];
  };

  that.processLawnmower = processLawnmower;

  that.patchType = function(longitude, latitude) {
    return PATCH_TYPES[getPatchType(longitude, latitude)];
  };

  that.bounds = getBounds;

  that.freshlyCut = function() {
    return (longGrassPatchCount === 0);
  };

  return that;
};

module.exports = lawn;

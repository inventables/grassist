GRASSIST.yard = function(patchStrings) {
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

  var processLawnmower = function(lawnmower) {
    var position = lawnmower.position();
    var longitude = position[0];
    var latitude = position[1];
    processTrampling(longitude, latitude);
    if (lawnmower.rotorEnabled()) {
      processCutting(longitude, latitude);
    }
  };

  var processTrampling = function(longitude, latitude) {
    var size = getSize();
    var minLongitude = 0, minLatitude = 0, maxLongitude = size[0] - 1, maxLatitude = size[1] - 1;
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
    return patches[latitude][longitude];
  };

  var setPatchType = function(longitude, latitude, patchType) {
    patches[latitude][longitude] = patchType;
  };

  var getSize = function() {
    return [patches[0].length, patches.length];
  };

  var patchType = function(longitude, latitude) {
    return PATCH_TYPES[getPatchType(longitude, latitude)];
  };

  var freshlyCut = function() {
    return (longGrassPatchCount === 0);
  };

  that.size = getSize;
  that.freshlyCut = freshlyCut;
  that.patchType = patchType;
  that.processLawnmower = processLawnmower;

  return that;
};

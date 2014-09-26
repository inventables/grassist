# Grassist

_(an undeniably clever portmanteaux of “grass” and “assist”)_

The challenge is to program a self-controlled lawnmower.

## The lawnmower

The lawnmower has a one-foot square cutting area. It can move one foot at a time in any of the cardinal directions (north, south, west, and east).

The lawnmower has the following low-level capabilities:
  - `startRotor` — start the rotor. When the rotor is powered on, the blades spin and cut any long grass below the lawnmower.
  - `stopRotor` — stop the rotor.
  - `moveForward` — move the lawnmower forward one foot, in the direction of its heading.
  - `turnRight` — change the lawnmower's heading by 90º clockwise.
  - `turnLeft` — change the lawnmower's heading by 90º counter-clockwise.

The following status information can be queried:
  - `position` — the current position, relative to the lawnmower's "home" position, measured in feet. The first value is the longitude, with positions east of the starting position being positive and west being negative. The second value is the latitude, with north being positive and south being negative.
  - `heading` — the current heading. One of `"north"`, `"south"`, `"west"`, or `"east"`.
  - `rotorEnabled` — whether or not the rotor is powered on. `true` or `false`.

## Yards

Yards can contain the following elements:
  - **Long grass** — The lawnmower _must_ pass over all the long grass in the yard with the rotor powered on. When the lawnmower passes over a patch of long grass with the rotor powered on, the patch becomes short grass. (The lawnmower _may_ pass over long grass with the rotor powered off, but the patch will remain long grass when that happens.)
  - **Short grass** — The lawnmower _may_ pass over short grass, with or without the rotor powered on.
  - **Sidewalks** — The lawnmower _may_ pass over sidewalks, with or without the rotor powered on.
  - **Mulch and gravel** — The lawnmower _may_ pass over mulch or gravel with rotor powered off, but it _must not_ pass over mulch or gravel with the rotor powered on.
  - **Plants and flowers** — The lawnmower _must not_ attempt to pass over plants or flowers at all, regardless of whether or not the rotor is powered on.

The following yard information can be queried:
  - `bounds` — the extrema of the lawn, relative to the lawnmower's "home" position, measured in feet. The first and second values are the minimum (westernmost and southernmost) longitude and latitude, and the third and fourth values are the maximum (easternmost and northernmost) longitude and latitude.
  - `patchType(longitude, latitude)` — the type of patch at the specified longitude and latitude. `longitude` and `latitude` are measured in feet, relative to the lawnmower's "home" position, with positive longitude values to the east and positive latitude values to the north. One of `"long_grass"`, `"short_grass"`, `"sidewalk"`, `"mulch_gravel"`, or `"plant_flower"`.

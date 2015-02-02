# Grassist

**Grassist** (_[grass-SIST]_, an undeniably clever portmanteaux of _grass_ and _assist_) is a controller for an autonomous lawnmower.

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
  - `home` — whether or not the lawnmower is currently in its "home" position. `true` or `false`.

## Yards

Yards can contain the following elements:
  - **Long grass** — The lawnmower can pass over long grass. If the lawnmower passes over a patch of long grass when the is rotor powered on, it will cut the grass patch, making it become short grass.
  - **Short grass** — The lawnmower can pass over short grass.
  - **Sidewalks** — The lawnmower can pass over sidewalks.
  - **Mulch and gravel** — The lawnmower can pass over mulch or gravel with rotor powered off, but it _must not_ attempt to pass over mulch or gravel with the rotor powered on or the lawnmower will get damaged.
  - **Plants and flowers** — The lawnmower _must not_ attempt to pass over plants or flowers at all, regardless of whether or not the rotor is powered on, or the lawnmower and/or landscaping will get damaged.

The following yard information can be queried:
  - `bounds` — the extrema of the lawn, relative to the lawnmower's "home" position, measured in feet. The first and second values are the minimum (westernmost and southernmost) longitude and latitude, and the third and fourth values are the maximum (easternmost and northernmost) longitude and latitude.
  - `patchType(longitude, latitude)` — the type of patch at the specified longitude and latitude. `longitude` and `latitude` are measured in feet, relative to the lawnmower's "home" position, with positive longitude values to the east and positive latitude values to the north. One of `"long_grass"`, `"short_grass"`, `"sidewalk"`, `"mulch_gravel"`, or `"plant_flower"`.
  - `freshlyCut` — whether or not all of the long grass has been cut. `true` or `false`.

## The challenge

Implement the movement controller in **lib/planner.js** such that, given a yard, it plans a route satisfying the following conditions:
  1. All the long grass in the yard gets cut.
  2. The lawnmower is returned to its "home" position with its rotors powered off.
  3. The lawnmower does not leave the bounds of the yard.
  4. The lawnmower and landscaping do not get damaged.

We have a [Jest](https://facebook.github.io/jest/) test suite with some failing tests. Your task is to get them all passing.

To run the tests, install the required dependencies with `npm install` and then run `npm test`.

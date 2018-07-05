# Grassist

**Grassist** (_[grass-SIST]_, an undeniably clever portmanteau of _grass_ and _assist_) is a controller for an autonomous lawnmower.

## The lawnmower

The lawnmower has a one-foot square cutting area. It can move one foot at a time in any of the cardinal directions (north, south, west, and east).

The lawnmower supports the following low-level commands:
  - `startRotor` — start the rotor. When the rotor is powered on, the blades spin and cut any long grass below the lawnmower.
  - `stopRotor` — stop the rotor.
  - `moveForward` — move the lawnmower forward one foot, in the direction of its heading.
  - `turnRight` — change the lawnmower's heading by 90º clockwise.
  - `turnLeft` — change the lawnmower's heading by 90º counter-clockwise.

For convenience, the above commands are chainable.

The following status information can be queried:
  - `position` — the lawnmower's current position within the yard. An array containing two values: the lawnmower's longitude and latitude, measured in feet, relative to the west and south edge of the yard. Positive longitude values are to the east and positive latitude values are to the north.
  - `heading` — the current heading. One of `"north"`, `"south"`, `"west"`, or `"east"`.
  - `rotorEnabled` — whether or not the rotor is powered on. `true` or `false`.
  - `home` — whether or not the lawnmower is currently in its "home" position. `true` or `false`.

## Yards

Yards can contain the following elements:
  - **Long grass** — The lawnmower can pass over long grass. If the lawnmower passes over a patch of long grass when the is rotor powered on, it will cut the grass patch, making it become short grass.
  - **Short grass** — The lawnmower can pass over short grass.

The following yard information can be queried:
  - `size` — the size of the yard, measured in feet. An array containing two values: the distance from the west edge to the east edge and the distance from the south edge to the north edge.
  - `patchType(longitude, latitude)` — the type of patch at the specified longitude and latitude. `longitude` and `latitude` are measured in feet, relative to the west and south edge of the yard. Positive longitude values are to the east and positive latitude values are to the north. One of `"long_grass"`, `"short_grass"`.
  - `freshlyCut` — whether or not all of the long grass has been cut. `true` or `false`.

## The challenge

Implement the movement controller in **lib/planner.js** such that, given a yard, it plans a route satisfying the following conditions:
  1. All the long grass in the yard gets cut.
  2. The lawnmower does not leave the bounds of the yard.

We have a [Jasmine](http://jasmine.github.io/2.0/introduction.html) test suite with some failing tests. Your task is to get them all passing.

To run the tests, open **jasmine/SpecRunner.html** in your browser.

We have a visual simulator that will show the behavior of your movement controller on the same yards as the test suite. This may be helpful for debugging. To run the simulator, open **simulator/index.html** in your browser.

## Going further

Want to add some additional challenge? The planner spec includes some specs marked as pending. Feel free to implement any or all of those.
They add a few new yard elements your code will need to take into account:

  - **Sidewalks** — The lawnmower can pass over sidewalks.
  - **Mulch and gravel** — The lawnmower can pass over mulch or gravel with rotor powered off, but it _must not_ attempt to pass over mulch or gravel with the rotor powered on or the lawnmower will get damaged.
  - **Plants and flowers** — The lawnmower _must not_ attempt to pass over plants or flowers at all, regardless of whether or not the rotor is powered on, or the lawnmower and/or landscaping will get damaged.
  
  Additionally, `patchType` can now return `"sidewalk"`, `"mulch_gravel"`, or `"plant_flower"` in addition to `"long_grass"` and `"short_grass"`

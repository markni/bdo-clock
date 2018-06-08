# bdo-clock

A JavaScript Library to convert real time into Black Desert Online in game clock.

## Install
```
npm install bdo-clock --save
```

## Usage

```javascript
const bdoClock = require('bdo-clock');

console.log(`Current in game time is ${bdoClock()}`);

console.log(`If current UTC date is 2018-06-08T20:20Z, in game time is ${bdoClock('2018-06-08T20:20Z')}`); // 7:00 a.m.

console.log(`If current UTC date is 2018-06-08T20:20Z, in game time is ${bdoClock('2018-06-08T20:20Z').isDaytime ? 'day time' : 'night time'}`); // day time

// display next time day change to night or vice versa
console.log(`If current UTC date is 2018-06-08T20:20Z, in game time is ${bdoClock('2018-06-08T20:20Z').nextDayNightChange.toLocalString()}`);

// .timeElapsed returns a moment duration object since 0am in game, useful to display clock in your custom format
console.log(`If current UTC date is 2018-06-08T20:20Z, in game time is ${bdoClock('2018-06-08T20:20Z').timeElapsed.hours()}`);

```

This library uses [moment.js](https://github.com/moment/moment), so it takes any parameter take `moment()` can take.

## License
bdo-clock is freely distributable under the terms of the MIT license.
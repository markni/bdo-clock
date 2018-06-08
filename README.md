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
```

### Custom Date
This library uses [moment.js](https://github.com/moment/moment), so it takes any parameter take `moment()` can take.

```javascript
bdoClock('2018-06-08T20:20Z').toString(); // "7:00 a.m."
```

### Find out Day/Night Time
```javascript
bdoClock('2018-06-08T20:20Z').isDaytime; // true
```

### Find next time day change to night or vice versa
```javascript
bdoClock('2018-06-08T20:20Z').nextDayNightChange.toISOString(); // "2018-06-08T23:40:00.000Z"
```

### Find out time elapsed since 0 a.m. in game
See [moment.Durations](https://momentjs.com/docs/#/durations/) on how to use the returned duration object
```javascript
bdoClock('2018-06-08T20:20Z').timeElapsed.hours(); // 7
```


## License
**bdo-clock** is freely distributable under the terms of the MIT license.

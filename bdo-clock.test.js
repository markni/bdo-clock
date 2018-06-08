const assert = require('assert');
const moment = require('moment');
const bdoClock = require('./bdo-clock');
const b1 = bdoClock('2018-06-08T20:20Z'); //7am in game
const b2 = bdoClock('2018-06-08T07:53Z');
const b3 = bdoClock().toString();
const b4 = bdoClock(moment('2018-06-08T20:20Z').add(200, 'minutes')); //10 pm in game


assert.strictEqual(b1.toString(), '7:00 a.m.');
assert.strictEqual(b2.toString(), '12:55 a.m.');
assert.strictEqual(b4.toString(), '10:00 p.m.');
assert(b3.toString().length >= 9, true);
assert(b1.isDaytime === true);
assert(b2.isDaytime === false);
//if current in game time is 7 am, the next day night shift should be in exactly 200 minutes
assert.strictEqual(b1.nextDayNightChange.toISOString(), moment('2018-06-08T20:20Z').add(200, 'minutes').toISOString());
assert.strictEqual(b4.nextDayNightChange.toISOString(), moment('2018-06-08T20:20Z').add(4, 'hours').toISOString());
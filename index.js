const moment = require('moment');

class BDOClock {
  constructor(options){
    const in_game_daytime_hours = { start: 7, end: 22 };
    const in_game_full_day_in_real_seconds = 4 * 60 * 60; // a full day in game equals 4 hours in real life.
    const in_game_daytime_minute_in_real_seconds = 200 * 60 / 15 / 60; // one minute in game seconds in day time (7am - 10pm) equals 200 minutes in real life or 13.333333 seconds in real life.
    const in_game_nighttime_minute_in_real_seconds = (in_game_full_day_in_real_seconds - 15 * 60 * in_game_daytime_minute_in_real_seconds) / 9 / 60; // one minute in game seconds in day time (7am - 10pm) equals to 4.444444 seconds in real life.
    const in_game_day_time_in_real_seconds =
      (in_game_daytime_hours.end - in_game_daytime_hours.start) *
      60 *
      in_game_daytime_minute_in_real_seconds; // the amount of seconds in real life for whole day time in game.
    const in_game_day_start_in_in_game_seconds = in_game_daytime_hours.start * 60;

    let startTime = moment(options)
      .utc()
      .startOf('day')
      .hours(20)
      .minute(20); // Every day at UTC time 20:20.01, game starts a new day time at 7 a.m. in game
    const currentTime = moment(options);
    if (startTime > currentTime) {
      startTime.subtract(1, 'day'); //if moment gets the upcoming reset time, we turn clock back 1 day to get last reset time.
    }
    const timePassed =
      moment.duration(currentTime.diff(startTime)).asSeconds() %
      in_game_full_day_in_real_seconds; // use the reminder to find out how much in real life time has passed since reset
    let current_in_game_minutes = in_game_day_start_in_in_game_seconds; // Init as 7 hours, since in game already 7 a.m. when reset start
    let upcoming = 'night';
    let real_seconds_util_next_shift = 0; // time in second until next day/night change;

    if (timePassed < in_game_day_time_in_real_seconds) {
      // if we still in day time, simply add timePassed in day time minute to seconds exchange rate.
      current_in_game_minutes +=
        timePassed / in_game_daytime_minute_in_real_seconds;
      real_seconds_util_next_shift =
        in_game_day_time_in_real_seconds - timePassed;
      this.isDaytime = true;
    } else {
      // ir we already in night time, first add full daytime in seconds, then add the rest in night time rate
      upcoming = 'day';
      this.isDaytime = false;
      real_seconds_util_next_shift =
        in_game_full_day_in_real_seconds - timePassed;
      current_in_game_minutes +=
        in_game_day_time_in_real_seconds /
        in_game_daytime_minute_in_real_seconds +
        (timePassed - in_game_day_time_in_real_seconds) /
        in_game_nighttime_minute_in_real_seconds;
    }
    let current_in_game_duration = moment.duration(
      current_in_game_minutes,
      'minute'
    );
    this.timeElapsed = current_in_game_duration;
    this.nextDayNightChange = currentTime.clone().add(real_seconds_util_next_shift, 'seconds');
  }

  toString() {
    let current_in_game_hours = this.timeElapsed.hours();
    let current_in_game_minutes = this.timeElapsed.minutes();
    let current_in_game_period = 'a.m.';
    if (current_in_game_hours > 12) {
      current_in_game_hours = current_in_game_hours % 12;
      current_in_game_period = 'p.m.';
    } else if (current_in_game_hours === 12) {
      current_in_game_period = 'p.m.';
    }
    if (current_in_game_hours === 0) current_in_game_hours = 12;

    return `${current_in_game_hours}:${String(current_in_game_minutes).padStart(
      2,
      '0'
    )} ${current_in_game_period}`;
  }
}


module.exports = (options) => {
  return new BDOClock(options);
};
import moment from 'moment';

export declare interface BDOClock {
    isDaytime: boolean,
    nextDayNightChange: moment.Moment,
    timeElapsed: moment.Duration,
    toString: string,
}

export default function bdoClock(inp?: moment.MomentInput, format?: moment.MomentFormatSpecification, language?: string, strict?: boolean): BDOClock;
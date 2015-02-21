"use strict";

var HRTime = function(then, options) {
    
    var SECOND = 1000,
        MINUTE = SECOND * 60,
        HOUR = MINUTE * 60,
        DAY = HOUR * 24,
        MONTH = DAY * 30.583, // mean month length
        YEAR = MONTH * 12,
        DECADE = YEAR * 10,
        CENTURY = YEAR * 100,
        MILLENIUM = YEAR * 1000;
    
    var now = new Date();
    var roundFunc = Math.round;
    
    if (options) {
        if (options.now) now = options.now;
        if (options.roundDown) roundFunc = Math.floor;
    }
    
    if (!(then.constructor === Date && now.constructor === Date)) {
        return false;
    }
    
    var d = now.getTime() - then.getTime();
    var delta = Math.abs(d);
    
    var times = {
        millisecond: roundFunc(delta),
        second: roundFunc(delta / SECOND),
        minute: roundFunc(delta / MINUTE),
        hour: roundFunc(delta / HOUR),
        day: roundFunc(delta / DAY),
        month: roundFunc(delta / MONTH),
        year: roundFunc(delta / YEAR),
        decade: roundFunc(delta / DECADE),
        century: roundFunc(delta / CENTURY),
        millenium: roundFunc(delta / MILLENIUM)
    };

    var timesKeys = Object.keys(times);

    var returnVal = {
        time: times.millisecond,
        unit: "millisecond",
        future: false
    };

    timesKeys.forEach(function(key){
        if (times[key] < returnVal.time && times[key] > 0) {
            returnVal.time = times[key];
            returnVal.unit = key;
        }
    });
    
    if (d < 0) returnVal.future = true;

    return returnVal;
};
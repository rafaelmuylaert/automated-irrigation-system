const DailyMeasurement = require("../models/measurements/daily-measurement");
const HourlyMeasurement = require("../models/measurements/hourly-measurement");
const MinutelyMeasurement = require("../models/measurements/minutely-measurement");
const SecondlyMeasurement = require("../models/measurements/secondly-measurement");

exports.setMeasurement = async (measurementdata, queryFilter) => {
    const lastDailyMeasurement = await DailyMeasurement.findOne(queryFilter).sort({ timestamp: -1 });
    const date = new Date();
    var update = false;
    if (lastDailyMeasurement) {
        if(lastDailyMeasurement.timestamp.getDate() < date.getDate()){update = true;}
    } 
    if(update){DailyMeasurement.create(measurementdata);}
    
    const lastHourlyMeasurement = await HourlyMeasurement.findOne(queryFilter).sort({ timestamp: -1 });
    var update = false;
    if (lastHourlyMeasurement) {
        if (lastHourlyMeasurement.timestamp.getHours() < date.getHours()){update = true;}
        
    } 
    if(update){HourlyMeasurement.create(measurementdata);}
    MinutelyMeasurement.create(measurementdata);
    SecondlyMeasurement.create(measurementdata);
    result = [];
    return result;
};

exports.getDailyMeasurements = (queryFilter) => {
    return DailyMeasurement.find(queryFilter);
};

exports.getHourlyMeasurements = (queryFilter) => {
    return HourlyMeasurement.find(queryFilter);
};

exports.getMinutelyMeasurements = (queryFilter) => {
    return MinutelyMeasurement.find(queryFilter);
};

exports.getSecondlyMeasurements = (queryFilter) => {

    return SecondlyMeasurement.find(queryFilter);
};

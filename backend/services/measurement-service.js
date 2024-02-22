const DailyMeasurement = require("../models/measurements/daily-measurement");
const HourlyMeasurement = require("../models/measurements/hourly-measurement");
const MinutelyMeasurement = require("../models/measurements/minutely-measurement");
const SecondlyMeasurement = require("../models/measurements/secondly-measurement");

exports.setMeasurement = async (measurementdata, queryFilter) => {
    
    const date = new Date().getTime();
	
	const lastDailyMeasurement = await DailyMeasurement.findOne(queryFilter).sort({ timestamp: -1 });
    if (!lastDailyMeasurement || date - lastDailyMeasurement.timestamp.getTime() > 86400000) {DailyMeasurement.create(measurementdata);}
	
    const lastHourlyMeasurement = await HourlyMeasurement.findOne(queryFilter).sort({ timestamp: -1 });
	if (!lastHourlyMeasurement || date - lastHourlyMeasurement.timestamp.getTime() > 3600000) {HourlyMeasurement.create(measurementdata);}
	
	const lastMinutelyMeasurement = await MinutelyMeasurement.findOne(queryFilter).sort({ timestamp: -1 });
	if (!lastMinutelyMeasurement || date - lastMinutelyMeasurement.timestamp.getTime() > 60000) {MinutelyMeasurement.create(measurementdata);}
	
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

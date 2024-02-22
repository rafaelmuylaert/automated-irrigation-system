const DailyMeasurement = require("../models/measurements/daily-measurement");
const HourlyMeasurement = require("../models/measurements/hourly-measurement");
const MinutelyMeasurement = require("../models/measurements/minutely-measurement");
const SecondlyMeasurement = require("../models/measurements/secondly-measurement");

exports.setMeasurement = async (measurementdata, queryFilter) => {
    const lastDailyMeasurement = await DailyMeasurement.findOne(queryFilter).sort({ timestamp: -1 });
    const date = new Date().getTime();
	
    var update = false;
    if (lastDailyMeasurement) {
        if(date - lastDailyMeasurement.timestamp.getTime() > 86400000){update = true;}
    } 
    else {update = true;}
    if(update){DailyMeasurement.create(measurementdata);}
	console.log("----Daily----");
	console.log(update);
	console.log(lastDailyMeasurement.timestamp.getTime());
	console.log(date);
	console.log(date - lastDailyMeasurement.timestamp.getTime());
	console.log(date - lastDailyMeasurement.timestamp.getTime() > 86400000);
	
	
    const lastHourlyMeasurement = await HourlyMeasurement.findOne(queryFilter).sort({ timestamp: -1 });
    update = false;
    if (lastHourlyMeasurement) {
        if (date - lastHourlyMeasurement.timestamp.getTime() < 3600000){update = true;}
    } 
    else {update = true;}
    if(update){HourlyMeasurement.create(measurementdata);}
	console.log("----Hourly----");
	console.log(update);
	console.log(lastHourlyMeasurement.timestamp.getTime());
	console.log(date);
	console.log(date - lastHourlyMeasurement.timestamp.getTime());
	console.log(date - lastHourlyMeasurement.timestamp.getTime() > 3600000);
	
	
	const lastMinutelyMeasurement = await MinutelyMeasurement.findOne(queryFilter).sort({ timestamp: -1 });
    update = false;
    if (lastMinutelyMeasurement) {
        if (date - lastMinutelyMeasurement.timestamp.getTime() < 60000){update = true;console.log("----HERE1----");}
    } 
    else {update = true;console.log("----HERE2----");}
    if(update){lastMinutelyMeasurement.create(measurementdata);}
	console.log("----Minutely----");
	console.log(update);
	console.log(lastMinutelyMeasurement.timestamp.getTime());
	console.log(date);
	console.log(date - lastMinutelyMeasurement.timestamp.getTime());
	console.log(date - lastMinutelyMeasurement.timestamp.getTime() > 60000);
	console.log("-----DONE-----");
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

const Irrigation = require('../models/irrigations')
const Output = require('../models/outputs')
const preferenceService = require("../services/preference-service")
const sensorService = require("../services/sensor-service")
const irrigationService = require("./irrigation-service")

exports.getLastIrrigation = async (sensorName) => {
    return await Irrigation.findOne({ sensorName }).sort({ timestamp: -1 });
}

exports.setIrregation = async (capacity, sensorName) => {
    return await Irrigation.create({ capacity, sensorName })
}

exports.getIrrigations = async (sensorName) => {
    return await Irrigation.find({ sensorName })
}

exports.getOutputs = async (outputSensor) => {
    return (outputSensor && outputSensor !== "undefined") ? await Output.findOneAndUpdate({
            outputSensor
        }, {
            $setOnInsert: {
                Porttimes: {},
                outputSensor
            }
        }, {
            returnOriginal: false,
            upsert: true,
            new: true
        }) : {}
}




exports.updateOutputs = async (outputSensor, signalPin, irrigationTimeInSeconds) => {
    const outputs = await irrigationService.findOneAndUpdate(
      {
        outputSensor: outputSensor,
      },
      { $set: { "Porttimes.$[e1]": {signalPin, irrigationTimeInSeconds} } },
      {
        arrayFilters: [
          { "e1.signalPin": signalPin },
        ],
      }
    {
        returnOriginal: false,
        upsert: true,
        new: true
    });
    return outputs
}

exports.irrigateIfNeeded = async (currentCapacity, sensorName) => {
    const preferences = await preferenceService.getPreference(sensorName)
    if (await isLastIrrigationTimeBufferPassed(preferences, sensorName) && currentCapacity > preferences.capacityBuffer) {
        irrigationService.setIrregation(currentCapacity, sensorName)
        if(preferences.outputSensor == "Local"){
            sensorService.irrigate(preferences.irrigationTimeInSeconds, sensorName)
        } else {
            irrigationService.updateOutputs(preferences.outputSensor, preferences.signalPin, preferences.irrigationTimeInSeconds)
        }
    }  
    return irrigationService.getOutputs(sensorName)
}

async function isLastIrrigationTimeBufferPassed(preferences, sensorName) {
    const lastMeasurement = await irrigationService.getLastIrrigation(sensorName)
    const now = new Date().getTime()
    if (lastMeasurement) {
        let lastMeasurementTime = lastMeasurement.timestamp
        lastMeasurementTimePlusBuffer = lastMeasurementTime.setMinutes(lastMeasurementTime.getMinutes() + preferences.minIrrigationIntervalInMinutes)
        return now > lastMeasurementTimePlusBuffer
    } else return true
}

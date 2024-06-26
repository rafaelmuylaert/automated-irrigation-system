/** @jsxImportSource theme-ui */
import { jsx } from "theme-ui";
import { useState, useEffect} from "react";
import Header from "./components/Header/Header";
import Card from "./shared/Card/Card";
import IotButton from "./components/IotButton/IotButton";
import LineChart from "./components/LineChart/LineChart";
import Preferences from "./components/Preferences/Preferences";
import SensorPicker from "./components/SensorPicker/SensorPicker";
import "./style.css"




const Main = () => {
  const [sensors, setSensors] = useState([]);
  const [sensorInFocus, setSensorInFocus] = useState();
  useEffect(() => {
    getSensors()
  }, [setSensors])

  const getSensors = () => {
    fetch(document.URL.replace(":5000", ":3000")+`preferences`)
      .then(res => res.json())
      .then(
        async (sensors) => {
          setSensors(sensors)
          setSensorInFocus(sensors[0].sensorName)
        },
        (error) => {
          console.log(`Coudn't fetch data. Error: ${error}`)
        }
      )
  }

  return (
    <div>
      <Header />
      <div className="main">
        <div className="container row">
          <div className="col-12">
            <SensorPicker sensors={sensors} setSensorInFocus={setSensorInFocus} sensorInFocus={sensorInFocus} />
          </div>
          <div className="col-md-12">
            <Card title="Statistics" body={<LineChart sensors={sensors} sensorInFocus={sensorInFocus} />} />
          </div>
          <div className="col-md-6">
            <Card title="Preferences" body={<Preferences sensorInFocus={sensorInFocus} sensors={sensors} />} />
          </div>
          <div className="col-md-6">
            <Card body={<IotButton sensorInFocus={sensorInFocus} />} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;

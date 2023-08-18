import { React, useState } from "react";
import parseFIT from "../../parseFIT";
import EChartsReact from "echarts-for-react";
import moment from "moment";
import DataCharts from "./DataCharts";
import Map from "./Map";

export default function Activity() {
  const [fitData, setFitData] = useState(null);

  const onFileIput = (event) => {
    const selectedFile = event.target.files[0]; // Get the selected file

    if (selectedFile) {
      // Create a FileReader instance
      const reader = new FileReader();

      // Define a function to handle the file reading completion
      reader.onload = function (event) {
        // Update the content display with the read data
        try {
          parseFIT(event.target.result).then((data) => {
            console.log(data);
            setFitData(data);
          });
        } catch (error) {
          console.error(error);
        }
      };
      // Start reading the file as text
      reader.readAsArrayBuffer(selectedFile);
    }
  };

  return (
    <div>
      Select .FIT file:
      <input type="file" id="file" name="file" onChange={onFileIput} />
      {fitData && <DataCharts data={fitData.records} />}
      {fitData && <Map data={fitData.records} />}
    </div>
  );
}

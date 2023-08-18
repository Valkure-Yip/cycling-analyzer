import EChartsReact from "echarts-for-react";
import "echarts/extension/bmap/bmap";
import moment from "moment";

const heartRateZones = [
  [0, 123, "Warm up", "#93CE07"],
  [123, 153, "Fat burning", "#FBDB0F"],
  [153, 169, "Aerobic", "#FC7D02"],
  [169, 184, "Anaerobic", "#FD0100"],
  [184, Infinity, "Red line", "#AA069F"],
];

export default function DataCharts({ data }) {
  // convert elapsed seconds to hh:mm:ss
  const getElaspedTime = (time) => {
    return moment.utc(time * 1000).format("HH:mm:ss");
  };

  const getHeartRatePieces = (data) => {
    let lowerTime = 0;
    let upperTime = 0;
    let currentZone = 0;
    let pieces = [];
    for (let i = 0; i < data.length; i++) {
      const record = data[i];
      let zone = heartRateZones.findIndex((zone) => {
        if (record.heart_rate >= zone[0] && record.heart_rate < zone[1]) {
          return true;
        }
        return false;
      });
      if (zone === currentZone) {
        upperTime = i;
      } else {
        pieces.push({
          min: lowerTime,
          max: upperTime + 1,
          color: heartRateZones[currentZone][3],
        });
        lowerTime = i;
        upperTime = i;
        currentZone = zone;
      }
    }
    return pieces;
  };

  const setOptions = (data) => {
    return {
      grid: [
        {
          height: "30%",
        },
        {
          top: "35%",
          height: "30%",
        },
        {
          top: "65%",
          height: "30%",
        },
      ],
      axisPointer: {
        link: [
          {
            xAxisIndex: "all",
          },
        ],
      },
      xAxis: [
        {
          type: "category",
          data: data.map((item) => getElaspedTime(item.elapsed_time)),
          name: "Time",
          show: false,
        },
        {
          gridIndex: 1,
          type: "category",
          data: data.map((item) => getElaspedTime(item.elapsed_time)),
          name: "Time",
          show: false,
        },
        {
          gridIndex: 2,
          type: "category",
          data: data.map((item) => getElaspedTime(item.elapsed_time)),
          name: "Time",
        },
      ],
      yAxis: [
        {
          type: "value",
          name: "Speed (km/h)",
        },
        {
          gridIndex: 1,
          type: "value",
          name: "heart rate (bpm)",
        },
        {
          gridIndex: 2,
          type: "value",
          name: "cadence (rpm)",
        },
      ],
      visualMap: {
        top: 50,
        right: 10,
        type: "piecewise",
        show: false,
        dimension: 0,
        seriesIndex: 1,
        pieces: getHeartRatePieces(data),
      },
      series: [
        {
          name: "Speed",
          data: data.map((item) => item.speed),
          type: "line",
        },
        {
          name: "Heart rate",
          data: data.map((item) => item.heart_rate),
          type: "line",
          xAxisIndex: 1,
          yAxisIndex: 1,
          areaStyle: {},
        },
        {
          name: "Cadence",
          data: data.map((item) => item.cadence),
          type: "line",
          xAxisIndex: 2,
          yAxisIndex: 2,
        },
      ],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          animation: false,
        },
        position: function (pt) {
          return [pt[0] + 16, pt[1] + 16];
        },
        valueFormatter: (val) => {
          return isNaN(val) ? null : val.toFixed(2);
        },
      },
      dataZoom: [
        {
          show: true,
          realtime: true,
          start: 0,
          end: data.length,
          xAxisIndex: [0, 1, 2],
        },
        {
          type: "inside",
          realtime: true,
          start: 0,
          end: data.length,
          xAxisIndex: [0, 1, 2],
        },
      ],
    };
  };

  return (
    <EChartsReact option={setOptions(data || [])} style={{ height: 1200 }} />
  );
}

import EChartsReact from "echarts-for-react";
import gcoord from "gcoord";

function trueCoord(coord) {
  return gcoord.transform(
    coord, // 经纬度坐标
    gcoord.WGS84, // 当前坐标系
    gcoord.BD09 // 目标坐标系
  );
}

export default function Map({ data }) {
  const getCoords = (data) => {
    let coords = [];
    for (let i = 0; i < data.length; i++) {
      const record = data[i];
      if (record.position_lat && record.position_long) {
        let coord_true = trueCoord([record.position_long, record.position_lat]);
        coords.push(coord_true);
      }
    }
    return { coords: coords };
  };
  const setOptions = (data) => {
    const coords = getCoords(data);
    const coords_array = coords.coords;
    const coord_center = [
      (coords_array[0][0] + coords_array[coords_array.length - 1][0]) / 2,
      (coords_array[0][1] + coords_array[coords_array.length - 1][1]) / 2,
    ];
    return {
      bmap: {
        center: coord_center,
        zoom: 13,
        roam: true,
        mapStyle: {
          styleJson: [
            {
              featureType: "water",
              elementType: "all",
              stylers: {
                color: "#d1d1d1",
              },
            },
            {
              featureType: "land",
              elementType: "all",
              stylers: {
                color: "#f3f3f3",
              },
            },
            {
              featureType: "railway",
              elementType: "all",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "highway",
              elementType: "all",
              stylers: {
                color: "#fdfdfd",
              },
            },
            {
              featureType: "highway",
              elementType: "labels",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "arterial",
              elementType: "geometry",
              stylers: {
                color: "#fefefe",
              },
            },
            {
              featureType: "arterial",
              elementType: "geometry.fill",
              stylers: {
                color: "#fefefe",
              },
            },
            {
              featureType: "poi",
              elementType: "all",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "green",
              elementType: "all",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "subway",
              elementType: "all",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "manmade",
              elementType: "all",
              stylers: {
                color: "#d1d1d1",
              },
            },
            {
              featureType: "local",
              elementType: "all",
              stylers: {
                color: "#d1d1d1",
              },
            },
            {
              featureType: "arterial",
              elementType: "labels",
              stylers: {
                visibility: "off",
              },
            },
            {
              featureType: "boundary",
              elementType: "all",
              stylers: {
                color: "#fefefe",
              },
            },
            {
              featureType: "building",
              elementType: "all",
              stylers: {
                color: "#d1d1d1",
              },
            },
            {
              featureType: "label",
              elementType: "labels.text.fill",
              stylers: {
                color: "#999999",
              },
            },
          ],
        },
      },
      series: [
        {
          type: "lines",
          coordinateSystem: "bmap",
          data: [coords],
          polyline: true,
          lineStyle: {
            color: "purple",
            opacity: 0.6,
            width: 2,
          },
        },
      ],
    };
  };
  return (
    <EChartsReact
      option={setOptions(data)}
      style={{ height: 600, width: "80%", left: "10%", position: "relative" }}
    />
  );
}

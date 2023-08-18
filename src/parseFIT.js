// Require the module
import EasyFit from "easy-fit";

// Read a .FIT file

var easyFit = new EasyFit({
  force: true,
  speedUnit: "km/h",
  lengthUnit: "km",
  temperatureUnit: "kelvin",
  elapsedRecordField: true,
  mode: "list",
});

export default function parseFIT(content) {
  return new Promise((resolve, reject) => {
    easyFit.parse(content, function (error, data) {
      // Handle result of parse method
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

const request = require("supertest");
const excelReaderIns = require("read-excel-file/node");
const csvUtils = require("../utils/csvUtils");

let method;
let baseURL;
let endPoint;
let apiKey;
let latitude;
let longitude;
let city;
let httpstatus;
let rowSet = new Array();

describe("Data Driven Approach for testing Weather API", () => {
  async function separateOutVariables(rowField) {
    method = rowField[0];
    baseURL = rowField[1];
    endPoint = rowField[2];
    apiKey = rowField[3];
    latitude = rowField[4];
    longitude = rowField[5];
    city = rowField[6];
    httpstatus = rowField[7];
  }

  beforeAll(async () => {
    rowSet = await excelReaderIns("Data/WeatherData.xlsx");
    rowSet.splice(0, 1);
  });

  afterAll(() => {
    //Close Server and Printout the report
  });

  let csvUtil = new csvUtils();
  var oneRow = new Array();
  test("Get Weather Details", async () => {
    for (var counter = 0; counter < rowSet.length; counter++) {
      // console.log('===================================================Test '+(counter+1)+'=========================================')
      oneRow = await csvUtil.getOneRowData(rowSet, counter);
      await separateOutVariables(oneRow);
      var requestParam =
        endPoint + "lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey;
      console.log(requestParam);

      const response = await request(baseURL)
        .get(requestParam)
        .set("accept", "application/json");

      expect(response.status).toBe(httpstatus);
      if (response.status == 200) {
        expect(response.body.name).toEqual(city);
      }
      // console.log(response.body);
    }
  });
});

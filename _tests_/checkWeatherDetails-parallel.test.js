const request = require("supertest");
const excelReaderIns = require("read-excel-file/node");
const CSVUtil = require("../utils/CSVUtil");
// const excelUtils = require("../config/excelUtils");
const XlsxPopulate = require("xlsx-populate");
const excelUtils = require("../utils/excelUtils");
const logger = require("../utils/logger");

// console.log(eee.arr("Data/WeatherData.xlsx","Sheet1"));
//eee.arr("Data/WeatherData.xlsx","Sheet1");

let method;
let baseURL;
let endPoint;
let apiKey;
let latitude;
let longitude;
let city;
let httpstatus;

describe("Data Driven Approach for testing Weather API", () => {
  beforeAll(async () => {
    // rowSet = await excelReaderIns("Data/WeatherData.xlsx");
    // rowSet.splice(0, 1);
  });

  afterAll(() => {
    //Close Server and Printout the report
  });

  test("Get Weather Details", () => {
    var eu = new excelUtils();
    var lg = new logger();
    eu.sheetAs2dArray("Data/WeatherData.xlsx", "Sheet1").then(oneRow => {
      lg.log(oneRow);
      method = oneRow[0];
      baseURL = oneRow[1];
      endPoint = oneRow[2];
      apiKey = oneRow[3];
      latitude = oneRow[4];
      longitude = oneRow[5];
      city = oneRow[6];
      httpstatus = oneRow[7];

      var requestParam =
        endPoint + "lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey;
      lg.log(requestParam);

      const response = request(baseURL)
        .get(requestParam)
        .set("accept", "application/json");

      expect(response.status).toBe(httpstatus);
      if (response.status == 200) {
        expect(response.body.name).toEqual(city);
      }
    });
  });

  let csvUtil = new CSVUtil();
  //var oneRow = new Array();
  // test.each(
  //   new excelUtils().sheetAs2dArray("../Data/WeatherData.xlsx", "Sheet1")
  // )("Get Weather Details", () => {
  //   // method = oneRow[0];
  //   // baseURL = oneRow[1];
  //   // endPoint = oneRow[2];
  //   // apiKey = oneRow[3];
  //   // latitude = oneRow[4];
  //   // longitude = oneRow[5];
  //   // city = oneRow[6];
  //   // httpstatus = oneRow[7];
  //   for (var counter = 0; counter < data.length; counter++) {
  //     // console.log('===================================================Test '+(counter+1)+'=========================================')
  //     //oneRow = await csvUtil.getOneRowData(rowSet, counter);
  //     //await separateOutVariables(oneRow);
  //     var requestParam =
  //       endPoint + "lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey;
  //     console.log(requestParam);

  //     const response = request(baseURL)
  //       .get(requestParam)
  //       .set("accept", "application/json");

  //     expect(response.status).toBe(httpstatus);
  //     if (response.status == 200) {
  //       expect(response.body.name).toEqual(city);
  //     }
  //     // console.log(response.body);
  //   }
  // });
});

const request = require("supertest");
const excelUtils = require("../utils/excelUtils");
const logger = require("../utils/logger");

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

  it("Get Weather Details", async () => {
    try {
      var eu = new excelUtils();
      var lg = new logger();
      eu.sheetAs2dArray("Data/WeatherData.xlsx", "Sheet1", false).then(
        oneRow => {
          test("running test for " + oneRow, async () => {
            lg.logStep("Executed for data-set: " + oneRow);
            method = oneRow[0];
            baseURL = oneRow[1];
            endPoint = oneRow[2];
            apiKey = oneRow[3];
            latitude = oneRow[4];
            longitude = oneRow[5];
            city = oneRow[6];
            httpstatus = oneRow[7];

            var requestParam =
              endPoint +
              "lat=" +
              latitude +
              "&lon=" +
              longitude +
              "&appid=" +
              apiKey;
            lg.logStep(requestParam);

            const response = request(baseURL)
              .get(requestParam)
              .set("accept", "application/json");

            expect(response.status).toBe(httpstatus);
            if (response.status == 200) {
              expect(response.body.name).toEqual(city);
            }
          });
        }
      );
    } catch (err) {
      lg.error(err);
    }
  });
});

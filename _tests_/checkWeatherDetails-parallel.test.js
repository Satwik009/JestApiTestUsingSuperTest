const request = require("supertest");
const excelUtils = require("../utils/excelUtils");
const logger = require("../utils/logger");

const eu = new excelUtils();
const lg = new logger();

var sheetData = eu.sheetAs2dArray("Data/WeatherData.xlsx", "Sheet1", false);

describe("Data Driven Approach for testing Weather API", () => {
  beforeAll(async () => {
    // rowSet = await excelReaderIns("Data/WeatherData.xlsx");
    // rowSet.splice(0, 1);
  });

  afterAll(() => {
    //Close Server and Printout the report
  });

  test("Get Weather Details", async () => {
    try {
      sheetData.then(sheetVals => {
        sheetVals.map(el => {
          singleRequestObject(el).then(reqResp => {
            expect.assertions(1);
            lg.verbose(
              "Verifying " +
                reqResp.response.status +
                " with " +
                reqResp.request.httpstatus
            );
            expect(reqResp.response.status).toBe(reqResp.request.httpstatus);
            if (reqResp.response.status == 200) {
              lg.logStep("Response received: " + reqResp.response.status);
              expect(reqResp.response.body.name).toEqual(reqResp.request.city);
            }
          });
        });
      });
    } catch (err) {
      lg.error(err);
    }
  });
});

async function singleRequestObject(dataRow) {
  try {
    lg.logStep("Executed for data-set -> " + dataRow);
    var reqObj = new Object();

    reqObj.method = dataRow[0];
    reqObj.baseURL = dataRow[1];
    reqObj.endPoint = dataRow[2];
    reqObj.apiKey = dataRow[3];
    reqObj.latitude = dataRow[4];
    reqObj.longitude = dataRow[5];
    reqObj.city = dataRow[6];
    reqObj.httpstatus = dataRow[7];

    reqObj.requestParams =
      reqObj.endPoint +
      "lat=" +
      reqObj.latitude +
      "&lon=" +
      reqObj.longitude +
      "&appid=" +
      reqObj.apiKey;
    lg.logStep("Data set provided request parameters: " + reqObj.requestParams);

    const response = await request(reqObj.baseURL)
      .get(reqObj.requestParams)
      .set("accept", "application/json");

    let reqResp = new Object();
    reqResp.request = reqObj;
    reqResp.response = response;

    return reqResp;
  } catch (error) {
    lg.error(error);
  }
}

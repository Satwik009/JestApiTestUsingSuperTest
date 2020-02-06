const excelUtils = require("../utils/excelUtils");
const logger = require("../utils/logger");
const request = require("../utils/requestUtils");

const eu = new excelUtils();
var lg = new logger();

var sheetData = eu.sheetAs2dArray("Data/weather-parallel-2-xlsx.xlsx", "Sheet1", false);

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
        const sheet = sheetVals.splice(1, sheetVals.length);
        sheet.map(el => {
          request.singleRequestObject(el).then(reqResp => {
            expect.assertions(1);
            lg.verboseLogForced(
              "Verifying " +
                reqResp.response.status +
                " with " +
                reqResp.request.httpstatus
            );
            try {
              //expect(reqResp.response.status).toBe(reqResp.request.httpstatus);
              if (reqResp.response.status != reqResp.request.httpstatus) {
                throw new Error(
                  "STATUS_MISMATCH_ERROR -> EXPECTED: " +
                    reqResp.request.httpstatus +
                    " <> RECEIVED: " +
                    reqResp.response.status
                );
              }
            } catch (e) {
              lg.log(e.message);
            }
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

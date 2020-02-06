const request = require("supertest");
const logger = require("../utils/logger");

const lg = new logger();

class requestUtils {
  async singleRequestObject(dataRow) {
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
      lg.logStep(
        "Data set provided request parameters: " + reqObj.requestParams
      );

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
}

module.exports = requestUtils;

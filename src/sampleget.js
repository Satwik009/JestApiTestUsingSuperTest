var supertest = require("supertest"),
  api = supertest("http://localhost:3030");

var endpoints = "/stores";
class sampleget {
  getListOfStores() {
    api.get(endpoints, function(req, res) {
      console.log(req.log());
      console.log(res.body());
    });

    api
      .get(endpoints)
      .expect("Content-Type", /json/)
      .expect(200);
  }
}

module.exports = sampleget;

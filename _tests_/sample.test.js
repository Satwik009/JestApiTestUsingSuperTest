const B = require("../src/samplerequest");
const C = require("../src/sampleget");
const D = require("../src/samplepost");

test("addition of two number", () => {
  var bc = new B();
  expect(bc.addition(8, 7)).toBe(15);
});

test("get the list of stores available from GET Request", () => {
  var ab = new C();
  ab.getListOfStores();
});

test("create new store from POST Request", () => {
  var cd = new D();
  cd.createNewStores();
});

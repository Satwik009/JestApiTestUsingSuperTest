const XlsxPopulate = require("xlsx-populate");
const logger = require("./logger");

let lg = new logger();
class excelUtils {
  async sheetAs2dArray(filePath, sheetName) {
    return this.sheetAs2dArray(filePath, sheetName, true);
  }

  async sheetAs2dArray(filePath, sheetName, removeHeaderRow) {
    try {
      return XlsxPopulate.fromFileAsync(filePath).then(workbook => {
        // Modify the workbook.
        const value = workbook
          .sheet(sheetName)
          .cell("A1")
          .value();

        // Log the value.
        lg.log(value);

        // Get 2D array of all values in the worksheet.
        const values = workbook
          .sheet(sheetName)
          .usedRange()
          .value();
        lg.log("2D Array of all values in the given sheet " + sheetName + " -----> " + values);

        if (removeHeaderRow) {
          return values.splice(0, 1);
        }
        return values;
      });
    } catch (error) {
      lg.log("ERROR OCCURED: " + error);
    }
  }
}
module.exports = excelUtils;

const XlsxPopulate = require("xlsx-populate");
const logger = require("./logger");

let lg = new logger();
class excelUtils {
  sheetAs2dArray(filePath, sheetName) {
    let values = this.sheetAs2dArray(filePath, sheetName, true);
    return values.then(vals => {
      return vals;
    });
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
        lg.verbose(value);

        // Get 2D array of all values in the worksheet.
        const values = workbook
          .sheet(sheetName)
          .usedRange()
          .value();
        lg.verbose(
          "2D Array of all values in the given sheet " +
            sheetName +
            " -----> " +
            values
        );

        if (removeHeaderRow) {
          return values.splice(0, 1);
        }
        return values;
      });
    } catch (error) {
      lg.error(error);
    }
  }
}
module.exports = excelUtils;

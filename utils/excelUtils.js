const XlsxPopulate = require("xlsx-populate");

class excelUtils {
  async sheetAs2dArray(filePath, sheetName) {
    return XlsxPopulate.fromFileAsync(filePath).then(workbook => {
      // Modify the workbook.
      const value = workbook
        .sheet(sheetName)
        .cell("A1")
        .value();

      // Log the value.
      //console.log(value);

      // Get 2D array of all values in the worksheet.
      const values = workbook
        .sheet(sheetName)
        .usedRange()
        .value();
      //console.log(values);
      return values;
    });
  }
}
module.exports = excelUtils;

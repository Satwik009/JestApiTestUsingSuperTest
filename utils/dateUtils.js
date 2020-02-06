class dateUtils {
  formatDate(date, separator) {
    var d;
    if (date === undefined || date == "") d = new Date();
    else d = new Date(date);

    var sep;
    if (separator === undefined || separator == "") sep = "";
    else sep = separator.substring(0, 1);

    var month = d.getMonth() + 1;
    var day = d.getDate();
    var year = d.getFullYear();

    month = (month < 10 ? "0" : "") + month;
    day = (day < 10 ? "0" : "") + day;

    return [year, month, day].join(sep);
  }

  today() {
    return this.formatDate(new Date());
  }
}

module.exports = dateUtils;

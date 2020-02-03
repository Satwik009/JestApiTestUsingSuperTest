var fs = require("fs");
var util = require("util");
var log_file = fs.createWriteStream("./debug.log", { flags: "w" });
var log_stdout = process.stdout;

class logger {
  async log(d) {
    //
    log_file.write(util.format(d) + "\n");
    log_stdout.write(util.format(d) + "\n");
  };
}

module.exports = logger;

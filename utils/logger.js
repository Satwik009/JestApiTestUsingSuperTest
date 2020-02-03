var fs = require("fs");
var util = require("util");

var log_file = fs.createWriteStream("./debug.log", { flags: "w" });
var log_stdout = process.stdout;

class logger {
  async logStep(d) {
    this.log("--STEP--" + d);
  }
  async error(d) {
    this.log("--ERROR--" + d);
  }

  async log(d) {
    try {
      log_file.write(util.format(d) + "\n");
      log_stdout.write(util.format(d) + "\n");
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = logger;

var fs = require("fs");
var util = require("util");

var log_file = fs.createWriteStream("debug.log", { flags: "a" });
var log_stdout = process.stdout;

var isVerboseEnabled = false;

class logger {
  async info(d) {
    this.log("--INFO--" + d);
  }

  async warn(d) {
    this.log("--WARN--" + d);
  }

  async logStep(d) {
    this.log("--STEP--" + d);
  }

  async error(d) {
    this.log("--ERROR--" + d);
  }

  async verbose(d) {
    if (isVerboseEnabled) this.log("--VERBOSE--" + d);
  }

  async verboseLogForced(d) {
    this.logToFile("--VERBOSE--" + d);
  }

  async log(d) {
    try {
      this.logToFile(d);
      this.logToStdOut(d);
    } catch (error) {
      console.log(error);
    }
  }

  logToFile(d) {
    try {
      log_file.write(util.format(d) + "\n");
    } catch (error) {
      console.log(error);
    }
  }

  logToStdOut(d) {
    try {
      log_stdout.write(util.format(d) + "\n");
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = logger;

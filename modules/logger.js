const TYPE_LOG = "log";
const TYPE_ERROR = "error";
const TYPE_INFO = "info";

if (!global.Logger) {
  class LOGGER {
    constructor() {
      this.logs = [];
      this.logLength = 100;
    }

    _addLog(string, type = null) {
      this.logs.push({
        string,
        type,
      });
    }

    _preClear() {
      if (this.logLength == this.logs.length) {
        this.logs.unshift();
      }
    }

    log(str) {
      this._preClear();
      this._addLog(str, TYPE_LOG);
    }
    info(str) {
      this._preClear();
      this._addLog(str, TYPE_INFO);
    }
    error(str) {
      this._preClear();
      this._addLog(str, TYPE_ERROR);
    }
    getLogs() {
      return this.logs;
    }
  }

  global.Logger = new LOGGER();
}

export default global.Logger;

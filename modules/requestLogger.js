if (!global.requestLogger) {
  class REQUEST_LOGGER {
    constructor() {
      this.logs = [];
      this.logLength = 100;
    }

    _addLog(server, from, payload) {
      this.logs.push({
        server,
        from,
        payload,
      });
    }

    _preClear() {
      if (this.logLength == this.logs.length) {
        this.logs.unshift();
      }
    }

    request(server, from, payload) {
      this._preClear();
      this._addLog(server, from, payload);
    }
    getLogs() {
      return this.logs;
    }
  }

  global.requestLogger = new REQUEST_LOGGER();
}

export default global.requestLogger;

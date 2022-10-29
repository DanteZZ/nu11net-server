import React, { Component } from "react";
import stylesheet from "../styles";
import logger from "../../modules/logger";
import chalk from "chalk";

/**
 * Progress component.
 */
class Log extends Component {
  constructor(props) {
    super(props);

    this.state = { logList: "" };

    setInterval(() => {
      this.setState({
        logList: logger.logs?.map((i) => this.formatLog(i)).join("\n") || "",
      });
      // this.refs?.logBox?.setScrollPerc(100);
    }, 100);
  }

  formatLog(log) {
    let result = "";
    switch (log.type) {
      case "error":
        result = chalk.red("[ERROR]: ") + log.string;
        break;
      case "info":
        result = chalk.cyan(log.string);
        break;
      default:
        result = log.string;
        break;
    }
    return result;
  }

  render() {
    return (
      <box
        ref="logBox"
        class={stylesheet.bordered}
        label="[ Log ]"
        width="60%"
        height="70%"
        scrollable={true}
      >
        {this.state.logList}
      </box>
    );
  }
}

export default Log;

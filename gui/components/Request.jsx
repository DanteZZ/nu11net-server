import React, { Component } from "react";
import stylesheet from "../styles";
import requestLogger from "../../modules/requestLogger";
import chalk from "chalk";

/**
 * Progress component.
 */
class Requests extends Component {
  constructor(props) {
    super(props);

    this.state = { logList: "" };

    setInterval(() => {
      this.setState({
        logList:
          requestLogger.logs?.map((i) => this.formatLog(i)).join("\n") || "",
      });
      this.refs?.logBox?.setScrollPerc(100);
    }, 100);
  }

  formatLog({ server, from, payload }) {
    return `[${chalk.cyan(server)}] ${chalk.magenta(from)}: ${JSON.stringify(
      payload
    )}`;
  }

  render() {
    return (
      <box
        ref="logBox"
        class={stylesheet.bordered}
        label="[ Requests ]"
        top="70%"
        width="60%"
        scrollable={true}
      >
        {this.state.logList}
      </box>
    );
  }
}

export default Requests;

import React, { Component } from "react";
import stylesheet from "../styles";
import chalk from "chalk";

/**
 * Progress component.
 */
class Clients extends Component {
  constructor(props) {
    super(props);

    this.state = { users: "", count: 0 };

    setInterval(() => {
      const users = Object.values(global?.users) || [];

      this.setState({
        users: users?.map((i) => this.formatUser(i.info)).join("\n") || "",
        count: users.length,
      });
      this.refs?.userBox?.setScrollPerc(100);
    }, 100);
  }

  formatUser(user) {
    return `${user.username} [${chalk.magenta(user.ip)}]`;
  }

  render() {
    return (
      <box
        ref="userBox"
        class={stylesheet.bordered}
        label={`[ Clients - ${this.state.count} ]`}
        left="60%"
        width="40%"
        height="100%"
        scrollable={true}
      >
        {this.state.users}
      </box>
    );
  }
}

export default Clients;

import React, { Component } from "react";
import blessed from "blessed";
import { render } from "react-blessed";

import Log from "./components/Log";
import Request from "./components/Request";
import Clients from "./components/Clients";
import { menu } from "./styles";
/**
 * Top level component.
 */
class Dashboard extends Component {
  render() {
    return (
      <element>
        <box>
          <Log />
          <Request />
          <Clients />
        </box>
        <box style={menu} width="100%" height={1} bottom={0} left={0}>
          Menu
        </box>
      </element>
    );
  }
}

/**
 * Rendering the screen.
 */
const screen = blessed.screen({
  autoPadding: true,
  smartCSR: true,
  title: "nu11net-server",
});

screen.key(["escape", "q", "C-c"], function (ch, key) {
  return process.exit(0);
});

render(<Dashboard />, screen);

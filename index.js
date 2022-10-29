require("dotenv/config");
require("@babel/core").transformSync("code", {
  plugins: ["@babel/plugin-transform-modules-commonjs"],
});
require("@babel/register")({
  presets: [["@babel/preset-env"], ["@babel/preset-react"]],
});

require("./modules/logger.js");
require("./modules/requestLogger.js");
require("./server.js");
require("./gui");

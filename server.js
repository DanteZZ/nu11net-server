import logger from "./modules/logger";
import "./modules/servers";
import "./db";
import md5 from "md5";
import webSocket from "ws";
import onConnect from "./handlers/connect";
import fs from "fs";

global.users = [];

const { SERVER_PORT } = process.env;

const init = async () => {
  try {
    await checkHash();
    const server = new webSocket.Server({ port: SERVER_PORT });
    server.on("connection", onConnect);
    logger.info(`[Server is started]`);
    logger.log(`Port: ${SERVER_PORT}`);
  } catch (e) {
    logger.error(e);
  }
};

const checkHash = async () => {
  if (fs.existsSync("./.hash") && fs.lstatSync("./.hash").isFile()) {
    global.SERVER_UNIQUE_HASH = fs.readFileSync("./.hash", "utf8");
  } else {
    global.SERVER_UNIQUE_HASH = md5(Date.now());
    fs.writeFileSync("./.hash", global.SERVER_UNIQUE_HASH);
  }
  return true;
};

init();

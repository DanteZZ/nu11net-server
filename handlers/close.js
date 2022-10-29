import logger from "../modules/logger";
import chalk from "chalk";

const onClose = (client) => {
  if (client?.info?.username) {
    logger.log(`user ${chalk.cyan(client.info.username)} close connection.`);
  } else {
    logger.log(`<#${client.info.num}> connection closed.`);
  }
};

export default onClose;

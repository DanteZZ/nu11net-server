import db from "../db";
import bcrypt from "bcrypt";
import logger from "../modules/logger";
import chalk from "chalk";

const checkPassword = (password, hash) => {
  return new Promise((res, rej) => {
    bcrypt.compare(password, hash, function (err, result) {
      if (err) {
        rej(err);
      } else {
        res(result);
      }
    });
  });
};

export const auth = async (client, payload, response) => {
  let status = 401;
  let result = false;

  try {
    const res = await db.get("SELECT * FROM `clients` WHERE `username` = ?", [
      payload.login,
    ]);
    if (res) {
      const ok = await checkPassword(payload.password || "", res.password);
      if (ok) {
        status = 300;
        result = {
          id: res.id,
          username: res.username,
          ip: res.ip,
          inf: JSON.parse(res.inf),
        };
        client.auth(result);
        logger.log(`user ${chalk.cyan(payload.login)} is authenticated.`);
      } else {
        status = 401;
      }
    } else {
      status = 401;
    }
  } catch (e) {
    logger.error(e);
    status = 402;
  }

  response({
    status,
    result,
  });
};

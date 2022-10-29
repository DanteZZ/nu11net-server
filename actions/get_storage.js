import fs from "fs";
import path from "path";

import { readDir, readFile } from "../helpers/fsPromise";
import logger from "../modules/logger";

const { STORAGE_DIR, DEFAULT_STORAGE } = process.env;

const getStorageFiles = async (p) => {
  const f = await readDir(p);
  const folders = f.filter((e) => e !== "map");
  const res = [];
  for (let i in folders) {
    res.push(await readDir(path.join(p, folders[i])));
  }
  return res.flat();
};

export const getStorage = async (client, { type }, response) => {
  const mapPath = path.join(STORAGE_DIR, `/${type}/map`);
  const defaultPath = path.join(STORAGE_DIR, `/${DEFAULT_STORAGE}/map`);

  const hasMap = fs.existsSync(mapPath) && fs.lstatSync(mapPath).isFile();
  const hasDefault =
    fs.existsSync(defaultPath) && fs.lstatSync(defaultPath).isFile();

  if (!hasMap) {
    logger.log(
      `User ${client.info.num} try get a "${type}" storage, but this is not exist.`
    );
  }

  if (hasDefault) {
    const usedType = hasMap ? type : DEFAULT_STORAGE;
    const map = JSON.parse(
      await readFile(path.join(STORAGE_DIR, `/${usedType}/map`))
    );
    const files = await getStorageFiles(path.join(STORAGE_DIR, `/${usedType}`));

    response({ map, files });
  } else {
    client.close(1011, "Unknown error on the server");
    logger.error(`Error with default storage.`);
  }
};

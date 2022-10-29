import fs from "fs";
import path from "path";
import { readFile } from "../helpers/fsPromise";

const { STORAGE_DIR } = process.env;

export const getStorageFile = async (client,{type,name},response) => {
    const filePath = path.join(STORAGE_DIR,type,name.charAt(0),name);
    if (fs.existsSync(filePath)) {
        response({
            data: await readFile(filePath)
        });
    } else {
        
    };
    
}
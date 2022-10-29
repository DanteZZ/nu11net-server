import fs from "fs";

export const readDir = path => new Promise((res,rej)=>fs.readdir(path,(err,files) => {
    if (err) {rej(err)} else {res(files)}
}))

export const readFile = (path,enc) => new Promise((res,rej)=>fs.readFile(path,enc,(err,file) => {
    if (err) {rej(err)} else {res(file)}
}))
import db from "../db";
import bcrypt from "bcrypt";
import { genStartInf } from "../modules/devices";

const genIp = () => {
    return (Math.floor(Math.random() * 255) + 1)+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255))+"."+(Math.floor(Math.random() * 255));
};

const isUsed = (ip) => {
    if (["127","192","10"].indexOf(ip.split(".")[0]) >=0) {
        return true;
    };
    if (global.USED_IPS.indexOf(ip) >=0) {
        return true;
    }
    return false;
};

const encryptPass = (password) => {
    return new Promise((res,rej)=>{
        bcrypt.hash(password, 10, function(err, hash) {
            if (err) {rej(err);} else {res(hash)};
        });
    })
}

export const register = async (client,payload,response) => {
    let status = 200;
    if ((payload.login.length > 2) && (payload.password.length > 4)) {
        try {
            const res = await db.get("SELECT * FROM `clients` WHERE `username` = ?",[payload.login])
            if (!res) {
                let ip = false;
                let hasIp = true;
                while (hasIp) {
                    ip = genIp();
                    const hasClient = await db.get("SELECT * FROM `clients` WHERE `ip` = ?",[ip]);
                    if (!hasClient && !isUsed(ip)) {
                        hasIp = false;
                    };
                };
                const encpass = await encryptPass(payload.password);
                await db.run('INSERT INTO "clients" ("username","password","ip","inf") VALUES (?,?,?,?);',[payload.login,encpass,ip,JSON.stringify(genStartInf())]);
            } else {
                status = 401;
            }
        } catch (e) {
            status = 402;
        };
    } else {
        status = 403
    }
    
    response({
        status
    })
}


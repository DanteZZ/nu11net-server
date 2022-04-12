import Servers from "../modules/servers";
import { CMD_SEND_PACKAGE } from "../modules/consts";

export const sendPackage = async (client,payload,response) => {
    const [address,port] = payload.address.split(":") || [null,null];
    const server = Servers.serverByAddress(address,port,client.info.ip);
    if (server) {
        server.sendData(payload,(data)=>response(data,CMD_SEND_PACKAGE),{address,port:+port,client});
    } else {
        if (global.users[address]) { // Если есть юзер с таким IP
            const to = global.users[address];
            to.sendCommand(CMD_SEND_PACKAGE,payload);
        } else {
            // ERROR
        }
    };
}
import onClose from "./close"
import onCommand from "./command";
import _ from "lodash";
import { TYPE_RESPONSABLE, TYPE_RESPONSE, TYPE_SIMPLE } from "../modules/consts";

let num = 0;
const clients = [];
global.users = {};

const clientBlank = {
    num:null,
    username:null,
    password:null,
    id:null,
    ip:null,
    pool:{},
    pool_last:1
};

const onMessage = (client,message) => {
    const msg = JSON.parse(message);
    switch (msg.type) {
        case TYPE_RESPONSE: // Проверка ответов
            if (this.pool_last[msg.response_id]) {
                this.pool_last[msg.response_id](msg.data,msg.command);
                delete this.pool_last[msg.response_id];
            }
        break;
        case TYPE_RESPONSABLE: // Проверка с запросом ответов
            onCommand(client,msg.command,msg.payload,(payload,command=null)=>{client.sendResponse(command,payload,msg.response_id)})
        break;
        case TYPE_SIMPLE: // Проверка но обычные
            onCommand(client,msg.command,msg.payload,(payload,command=null)=>{client.sendCommand(command,payload)})
        break;
    }
}

const onConnect = (client) => {
    num++;
    client.info = _.clone(clientBlank, true);
    client.info.num = num;

    console.log("New connection #" + num);
    clients.push(client);

    // Reg additional functions

    client.auth = (data) => {
        client.info = {...client.info,...data};
        global.users[data.ip] = client;
    };

    client.sendCommand = (command,payload) => {
        client.send(JSON.stringify({command,payload,type:TYPE_SIMPLE}))
    };

    client.sendResponse = (command,payload,response_id) => {
        client.send(JSON.stringify({command,payload,response_id,type:TYPE_RESPONSE}))
    };

    client.sendResponsableCommand = (command,payload,timeout=10) => new Promise((res,rej)=>{
        client.info.pool_last++;
        client.info.pool[client.info.pool_last] = res;

        client.send(JSON.stringify({
            command,
            payload,
            type:TYPE_RESPONSABLE,
            response_id:client.info.pool_last
        }))

        setTimeout(()=>{rej({
            command,
            error:"timeout"
        })},timeout*1000);
    })
    

    client.on("message", (message)=>onMessage(client,message));
    client.on("close", ()=>onClose(client))
};

export default onConnect;
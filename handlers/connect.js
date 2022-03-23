import onMessage from "./message";
import onClose from "./close"
import _ from "lodash";

let num = 0;
const clients = [];

const clientBlank = {
    num:null,
    username:null,
    password:null,
    id:null,
    ip:null
};

const onConnect = (client) => {
    num++;
    client.info = _.clone(clientBlank, true);

    client.info.num = num;

    console.log("New connection #" + num);
    clients.push(client);

    client.on("message", (message)=>onMessage(client,message));
    client.on("close", ()=>onClose(client))
};

export default onConnect;
import onMessage from "./message";
import onClose from "./close"

let num = 0;
const clients = [];
const onConnect = (client) => {
    num++;
    client._num = num;

    console.log("New connection #"+num);

    client.on("message", (message)=>onMessage(client,message));
    client.on("close", ()=>onClose(client))
};

export default onConnect;
import { auth } from "../actions/auth";
import { getServerInfo } from "../actions/get_server_info";
import { register } from "../actions/register";
import { CMD_GETSRVINFO, CMD_REGISTER, CMD_AUTH, CMD_SEND_PACKAGE } from "../modules/consts";

const onCommand = (client,command,payload,response=()=>{}) => {
    switch (command) {
        case CMD_GETSRVINFO: getServerInfo(client,payload,response); break;
        case CMD_REGISTER: register(client,payload,response); break;
        case CMD_AUTH: auth(client,payload,response); break;
        case CMD_SEND_PACKAGE: client.sendCommand(CMD_SEND_PACKAGE,{
            protocol: 'UDP',
            address: '*:68',
            data: {
                YIADDR:client.info.ip,
                SIADDR:"88.88.88.88",
                OPTIONS:{
                    MASK:24
                }
            }
        }); break;
    }
};

export default onCommand;
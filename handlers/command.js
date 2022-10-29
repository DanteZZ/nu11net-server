import { auth } from "../actions/auth";
import { getServerInfo } from "../actions/get_server_info";
import { register } from "../actions/register";
import { sendPackage } from "../actions/send_package";
import { getStorage } from "../actions/get_storage";

import { CMD_GETSRVINFO, CMD_REGISTER, CMD_AUTH, CMD_SEND_PACKAGE, CMD_GET_STORAGE, CMD_GET_STORAGE_FILE } from "../modules/consts";
import { getStorageFile } from "../actions/get_storage_file";

const onCommand = (client,command,payload,response=()=>{}) => {
    switch (command) {
        case CMD_GETSRVINFO: getServerInfo(client,payload,response); break;
        case CMD_REGISTER: register(client,payload,response); break;
        case CMD_AUTH: auth(client,payload,response); break;
        case CMD_SEND_PACKAGE: sendPackage(client,payload,response); break;
        case CMD_GET_STORAGE: getStorage(client,payload,response); break;
        case CMD_GET_STORAGE_FILE: getStorageFile(client,payload,response); break;
    }
};

export default onCommand;
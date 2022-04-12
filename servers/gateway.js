import Servers from "../modules/servers";

const DHCP_CLIENT_PORT = 68;


const server = async (srvinf) => {

    const ip2Gateway = (ip) => {
        const octets = ip.split(".").splice(0, 3);
        octets.push(srvinf.gateway_octet);
        return octets.join(".");
    }

    const DHCP = (client,response) => {
        const res = {
            protocol: 'UDP',
            address: `*:${DHCP_CLIENT_PORT}`,
            data: {
                YIADDR:client.info.ip,
                SIADDR:ip2Gateway(client.info.ip),
                OPTIONS:{
                    MASK:24,
                    DNS:srvinf.dns
                }
            }
        };
        response(res);
    };

    const onMessage = (payload,response,{client,port}) => {
        if (port == srvinf.dhcp_port) {DHCP(client,response);} // DHCP check
    };

    return onMessage;
}

export default server;
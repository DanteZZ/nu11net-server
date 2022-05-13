import fs from "fs";

if (!global.Servers) {
    class SRV {
        constructor() {
            this.info = null;
            this.ips = [];
            this.servers = [];
            this.GATEWAY = null;
            this.init();
        }

        init() {
            if (!this.info) {
                this.info = JSON.parse(fs.readFileSync(process.env.SERVERS_CONFIG, 'utf8'));
                for (let name in this.info) {
                    const inf = this.info[name]
                    if (inf.gateway) {
                        this.GATEWAY = {
                            ...inf,
                            proc: require("../servers/"+name),
                            ip:inf.ip || null,
                            port:inf.port || 53,
                            dhcp_port: inf.dhcp_port || 53,
                            gateway_octet:inf.gateway_octet || 1
                        };
                    } else {
                        this.ips.push(inf.ip);
                        this.servers.push({
                            ...inf,
                            proc: require("../servers/"+name),
                            ip:inf.ip,
                            port:inf.port
                        });
                    };
                    
                };
            };
            global.USED_IPS = this.ips;
            this.startServers();
        }

        async startServers() {
            for (let k in this.servers) {
                let srv = this.servers[k];
                this.servers[k].sendData = await srv.proc.default(srv);
            }
            if (this.GATEWAY) {
                this.GATEWAY.sendData = await this.GATEWAY.proc.default(this.GATEWAY);
            }
        }

        inSubnet(ip1,ip2) {
            const oct1 = ip1.split(".").splice(0, 3).join(".");
            const oct2 = ip2.split(".").splice(0, 3).join(".");
            return oct1 == oct2;
        }

        serverByAddress(ip=null,port,clientIp = null) {
            if (
                ((!ip || ip == "*") && +port == this.GATEWAY.dhcp_port) || // Если стучатся по DHCP порту без адреса
                (clientIp && ip && this.inSubnet(clientIp,ip) && (parseInt(ip.split(".")[3]) == this.GATEWAY.gateway_octet)) // Или по стандарному октету шлюза
            ) {
                return this.GATEWAY;
            } else {
                return this.servers.find(srv=>srv.ip == ip && srv.port == +port);
            };
        }

        ips() {return ips;}
    }

    global.Servers = new SRV();
}


export default global.Servers;
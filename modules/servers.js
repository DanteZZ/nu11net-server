import fs from "fs";

if (!global.Servers) {
    class SRV {
        constructor() {
            this.info = null;
            this.ips = [];
            this.servers = [];
            this.init();
        }

        init() {
            if (!this.info) {
                this.info = JSON.parse(fs.readFileSync(process.env.SERVERS_CONFIG, 'utf8'));
                for (let name in this.info) {
                    const inf = this.info[name]
                    this.ips.push(inf.ip);
                    this.servers.push({
                        proc: require("../servers/"+name),
                        ip:inf.ip,
                        port:inf.port
                    });
                };
            };
            global.USED_IPS = this.ips;
            this.startServers();
        }

        async startServers() {
            for (let k in this.servers) {
                let srv = this.servers[k];
                srv.sendData = await srv.proc.default();
            }
        }

        serverByAddress(ip,port) {
            return this.servers.find(srv=>srv.ip == ip && srv.port == +port);
        }

        ips() {return ips;}
    }

    global.Servers = new SRV();
}


export default global.Servers;
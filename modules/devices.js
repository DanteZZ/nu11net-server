import md5 from "md5";

const genMac = () => "XX:XX:XX:XX:XX:XX".replace(/X/g, function() {
    return "0123456789ABCDEF".charAt(Math.floor(Math.random() * 16))
});

const genHash = () => md5(Math.random().toString(36).substring(7))

const genStartInf = () => {
    const res = {devices:{},cables:{},connections:{}};
    const pc = {
        type:"pc",
        name:"Компьютер",
        power:false,
        position: {x:270,y:699},
        boot:{
            priority:[]
        },
        interfaces:{}
    }
    const pcHash = genHash(); // Компьютер
    const ethHash = genHash(); // Порт компа
    const inEthHash = genHash(); // Порт интернета

    pc.interfaces = {
        [ethHash]:{
            type:"ethernet",
            mac:genMac()
        },
        [genHash()]:{
            type:"storage",
            size:2048,
            boot_file:"kernel/init"
        },
        [genHash()]:{
            type:"display",
            width:800,
            height:600
        },
        [genHash()]:{
            type:"input"
        }
    };

    res.devices[pcHash] = pc;
    return res;
};

export {
    genStartInf,
}
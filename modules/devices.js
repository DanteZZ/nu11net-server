import md5 from "md5";

const genMac = () =>
  "XX:XX:XX:XX:XX:XX".replace(/X/g, function () {
    return "0123456789ABCDEF".charAt(Math.floor(Math.random() * 16));
  });

const genHash = () => md5(Math.random().toString(36).substring(7));

const genStartInf = () => {
  const res = {
    devices: {},
    cables: {},
    connections: {},
    portables: {},
    items: {},
  };
  const pc = {
    type: "pc",
    name: "Компьютер",
    power: false,
    position: { x: 855, y: 1028 },
    boot: {
      priority: [],
    },
    interfaces: {},
  };
  const socket = {
    type: "network_socket",
    name: "Интернет розетка",
    position: { x: 465, y: 1132 },
    interfaces: {},
  };

  const pcHash = genHash(); // Компьютер
  const ethHash = genHash(); // Порт компа
  const socketHash = genHash(); // Интернет розетка
  const socketEthHash = genHash(); // Порт интернета
  const usbPortHash = genHash(); // USB Порт
  const usbStorageHash = genHash(); // Usb устройство

  const cableHash = genHash(); // Интернет-кабель

  socket.interfaces = {
    [socketEthHash]: {
      type: "ethernet",
      mac: genMac(),
    },
  };

  pc.interfaces = {
    [ethHash]: {
      type: "ethernet",
      mac: genMac(),
    },
    [usbPortHash]: {
      type: "usb",
    },
    [genHash()]: {
      type: "storage",
      size: 2048,
      boot_file: "kernel/init",
      map_type: "hios",
    },
    [genHash()]: {
      type: "display",
      width: 800,
      height: 600,
    },
    [genHash()]: {
      type: "input",
    },
  };

  res.items = {
    //Portable USB storage
    [usbStorageHash]: {
      type: "portable",
      position: 0,
      data: {
        type: "usb_storage",
        map_type: "clean",
        connection: null, // `${pcHash}#${usbPortHash}`
      },
    },
  };

  res.cables[cableHash] = { type: "twistedpair" };
  res.connections[cableHash] = [
    `${pcHash}#${ethHash}`,
    `${socketHash}#${socketEthHash}`,
  ];

  res.devices[pcHash] = pc;
  res.devices[socketHash] = socket;

  return res;
};

export { genStartInf };

// UDP reciever
const dgram = require('dgram');
const udp_receiver = dgram.createSocket('udp4');

udp_receiver.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  udp_receiver.close();
});

udp_receiver.on('message', (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

udp_receiver.on('listening', () => {
  const address = udp_receiver.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

udp_receiver.bind(8000);

const net = require('net');

// UDP reciever
const dgram_r = require('dgram');
const udp_receiver = dgram_r.createSocket('udp4');

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


// *************************
// client
const dgram_s = require('dgram');
var cnt = 0;
setInterval(function() {
  const message = Buffer.from('message!!' + cnt++);
  const udp_client = dgram_s.createSocket('udp4');
  udp_client.send(message, 8888, 'localhost', (err) => {
      udp_client.close();
  });
  if(cnt == 5) {
    console.log("5!");
    cnt = 0;
    client.destroy();
  }
}, 1000);


// ******************************************************************************
// TCP
const client = net.connect('8080', 'localhost', () => {
    console.log('connected to server');
    client.write('Hello World!');
});

client.on('data', data => {
    console.log('client-> ' + data);
    // close connection
    //client.destroy();
});

client.on('close', () => {
    console.log('client-> connection is closed');
});

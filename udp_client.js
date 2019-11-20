const dgram = require('dgram');
const message = Buffer.from('message!!');
const client = dgram.createSocket('udp4');
client.send(message, 8000, 'localhost', (err) => {
  client.close();
});

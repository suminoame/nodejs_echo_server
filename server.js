const net = require('net');

// get command line INPUT (for port num)
// node sample.js AAAA BBBB ...
// 0:node
// 1:sample.js
// 2:AAAA
// 3:BBBB
// ...
const args = process.argv.slice(2);

// set TCP port
// if input empty or invalid number, set 8080
const port = args.length > 0 ? parseInt(args[0]) : 8080;

// create TCP server
var connect_num = 0;
var client_ip = [];
const server = net.createServer(socket => {
    var my_ip = socket.remoteAddress;
    var my_port = socket.remotePort;
    client_ip.push(my_ip);
    client_ip.forEach(n => console.log(n));

    console.log(connect_num++);

    socket.on('data', data => {
        console.log(data + ' from ' + my_ip + ':' + my_port);
        socket.write('server -> Repeating: ' + data);
    });

    // recieved "close request" (TCP connection)
    socket.on('close', () => {
        console.log('client closed connection ' + my_ip + ':' + my_port);

        // IPの登録を削除
        var new_array = client_ip.filter(n => n !== my_ip);
        client_ip = new_array;
    });

});


// UDP setup
const dgram = require('dgram');
const udp_server = dgram.createSocket('udp4');

// UDP server
udp_server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  udp_receiver.close();
});

// recieced UDP socket
udp_server.on('message', (msg, rinfo) => {
  const udp_client = dgram.createSocket('udp4');
  const sender_ip = rinfo.address;
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
  // 送信元IPアドレス以外の登録アドレスに送信
  client_ip.filter(n => {
    if(n === sender_ip) {
      console.log("echo for " + n);
        udp_client.send(msg, 8000, n, (err) => {
            udp_client.close();
        });
    }
  });
});

udp_server.on('listening', () => {
  const address = udp_server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

udp_server.bind(8888);



// TCP server listening
server.listen({ host: "localhost", port: port }, () => {
    console.log('listening on port ' + port);
});

// memo
// ***.on('イベント名', doRequest());

const express = require('express');
const app = express();
const http = require('http');const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");
const { Server } = require("socket.io");
var cors = require('cors')

const server = http.createServer(app);
const io = new Server(server);

app.use(cors())

io.on('connection', (socket) => {
  console.log('a user connected');
});


const port = new SerialPort({ baudRate: 9600, path: "/dev/ttyACM0" });
const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));

port.on("open", () => {
  console.log("serial port open");
});

let current = 0
parser.on("data", (data) => {
  console.log((Number(data) * -2000) + " gramos");
  current = Math.floor((Number(data) * -2000))
});

app.get('/', (req, res) => {
  res.send(`${current}`)
})

io.on('connection', (socket) => {
  console.log('a user connected');
});

app.listen(4000, () => {
  console.log(`Example app listening on port ${4000}`)
})

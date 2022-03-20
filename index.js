const http = require("http");
const { Server } = require("socket.io");
const dir = process.cwd();
const auth = require(dir+"/core/auth");
const port = 80;


const server = http.createServer((req,res)=>{
  res.end("ok");
}).listen(port);

const io = new Server(server);

io.use(auth).on("connection",(socket)=>{
  const id=socket.id;
  console.log(id,"connected...");
  socket.on("disconnect",()=>{
    console.log(id,"disconect...");
  });
});
const http = require("http");
const { Server } = require("socket.io");
const parseUrl = require("url-parse");
const dir = process.cwd();
const auth = require(dir+"/core/auth");
const main = require(dir+"/core/main");
const checkPageAssets = require(dir+"/core/is-page-assets");
const sendAssets = require(dir+"/core/send-assets");
const port = 80;
let connectToClient=false;
let ws=null;
const server = http.createServer(async (req,res)=>{
  const url = parseUrl(req.url);
  const pathname = url.pathname;
  const isPageAssest = await checkPageAssets(pathname);
  if(isPageAssest.status){
    await sendAssets(res,isPageAssest.dir);
  }else{
    await main(req,res,ws,connectToClient);
  };
}).listen(port);
const io = new Server(server);
io.use((socket,next)=>{
  auth(socket,next,connectToClient);
}).on("connection",(socket)=>{
  const id=socket.id;
  connectToClient=true;
  ws=socket;
  socket.on("disconnect",()=>{
    connectToClient=false;
    ws=null;
  });
});
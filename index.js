const http = require("http");
const { Server } = require("socket.io");
const parseUrl = require("url-parse");
const dir = process.cwd();
const auth = require(dir+"/core/auth");
const main = require(dir+"/core/main");
const checkPageAssets = require(dir+"/core/is-page-assets");
const sendAssets = require(dir+"/core/send-assets");
const handleImage = require(dir+"/core/handle-image");
const config = require(dir+"/config.json");

let connectToClient=false;
let ws=null;
const server = http.createServer(async (req,res)=>{
  const uriHost = req.headers["x-forwarded-proto"]+"://"+req.headers.host;
  const url = parseUrl(uriHost+req.url);
  const pathname = url.pathname;
  const isPageAssest = await checkPageAssets(pathname);
  if(isPageAssest.status){
    await sendAssets(res,isPageAssest.dir);
  }else if(pathname.indexOf(config["path-image"])==0 && pathname.indexOf(".jpeg")>0){
    const valImage = pathname.split(config["path-image"])[1].replace(".jpeg","");
    await handleImage(res,valImage);
  }else{
    await main(req,res,ws,connectToClient,url);
  };
}).listen(config.port,()=>{
  console.log("Server running on port",config.port);
});
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
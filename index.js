const http = require("http");
const port = 80;

http.createServer((req,res)=>{
  res.end("ok");
}).listen(port);
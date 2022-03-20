const fs = require("fs");
const {gzip} = require("node-gzip");
const dir = process.cwd();

module.exports = async (res)=>{
  const dom = await fs.readFileSync(dir+"/template/404.html","utf-8");
  res.writeHead(404,{
    "content-type":"text/html; charset=UTF-8",
    "content-encoding":"gzip"
  });
  const domZip = await gzip(dom);
  res.write(domZip);
  return res.end();
};
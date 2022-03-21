const fs = require("fs");
const {gzip} = require("node-gzip");
const dir = process.cwd();
const config = require(dir+"/config.json");

module.exports = async (req,res,ws,status,url)=>{
  let dom = await fs.readFileSync(dir+"/template/home.html","utf-8");
  const pathname = url.pathname;
  const lang = config.lang;
  const uri = url.origin+pathname;
  const hostname = url.hostname;
  const origin = url.origin;
  const href = url.href;
  const query = url.query;
  dom = await dom.replace(/\$\{lang\}/g,lang)
  .replace(/\$\{url\}/g,uri)
  .replace(/\$\{hostname\}/g,hostname)
  .replace(/\$\{origin\}/g,origin)
  .replace(/\$\{query\}/g,query)
  .replace(/\$\{href\}/g,href);
  dom = await gzip(dom);
  res.writeHead(200,{
    "content-type":"text/html; charset=UTF-8",
    "content-encoding":"gzip"
  });
  res.write(dom);
  return res.end();
};
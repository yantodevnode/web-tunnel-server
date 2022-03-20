const fs = require("fs");
const dir = process.cwd();

module.exports = async (res)=>{
  const dom = await fs.readFileSync(dir+"/template/502.html","utf-8");
  res.writeHead(502);
  res.write(dom);
  return res.end();
};
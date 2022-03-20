const fs = require("fs");
const mime = require('mime-types');
const {gzip} = require("node-gzip");

module.exports = async (res,pathdir)=>{
  try{
    const dom = await fs.readFileSync(pathdir);
    let typeMime = await mime.lookup(pathdir);
    if(typeMime==false){
      typeMime = "text/plain";
    };
    res.writeHead(200,{
      "content-type":typeMime,
      "content-encoding":"gzip"
    });
    const domZip = await gzip(dom);
    res.write(domZip);
    return res.end();
  }catch(e){
    res.write(String(e));
    return res.end();
  };
};
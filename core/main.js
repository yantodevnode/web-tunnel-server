const dir = process.cwd();
const send502 = require(dir+"/core/send-502");
const config = require(dir+"/config.json");
const handleSitemap = require(dir+"/core/sitemap");

module.exports = async (req,res,ws,status,url)=>{
  if(ws && status){
    const pathname = url.pathname;
    if(pathname==config["path-sitemap"]){
      await handleSitemap(req,res,ws,status,url);
    }else{
      res.writeHead(404);
      res.write("404");
      return res.end(); 
    };
  }else{
    await send502(res);
    return;
  };
};
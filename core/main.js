const dir = process.cwd();
const send404 = require(dir+"/core/send-404");
const send502 = require(dir+"/core/send-502");
const config = require(dir+"/config.json");
const handleSitemap = require(dir+"/core/sitemap");

module.exports = async (req,res,ws,status,url)=>{
  if(ws && status){
    const pathname = url.pathname;
    if(pathname==config["path-sitemap-index"]){
      await handleSitemap(req,res,ws,status,url);
    }else{
      await send404(res);
      return;
    };
  }else{
    await send502(res);
    return;
  };
};
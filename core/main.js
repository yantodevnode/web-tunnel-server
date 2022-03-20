const dir = process.cwd();
const send404 = require(dir+"/core/send-404");
const send502 = require(dir+"/core/send-502");
const config = require(dir+"/config.json");
const handleSitemapIndex = require(dir+"/core/sitemap-index");
const handleSitemapChild = require(dir+"/core/sitemap-child");
const handlePost = require(dir+"/core/post");

module.exports = async (req,res,ws,status,url)=>{
  if(ws && status){
    const pathname = url.pathname;
    if(pathname==config["path-sitemap-index"]){
      await handleSitemapIndex(req,res,ws,status,url);
    }else if(pathname.indexOf(config["path-sitemap-urlset"])==0){
      await handleSitemapChild(req,res,ws,status,url);
    }else if(pathname.indexOf(config["path-content-post-start"])==0 && pathname.indexOf(config["path-content-post-end"])>0){
      let indexPath = pathname.split(config["path-content-post-start"])[1];
      if(indexPath){
        indexPath = indexPath.split(config["path-content-post-end"]);
        if(indexPath.length==2){
          const file = indexPath[0];
          const id = indexPath[1];
          if(file && id && typeof file=="string" && typeof id=="string" && file.length>0 && id.length>0){
              await handlePost(req,res,ws,status,url,file,id);
            }else{
              await send404(res);
              return;
            };
        }else{
          await send404(res);
          return;
        };
      }else{
        await send404(res);
        return;
      };
    }else{
      await send404(res);
      return;
    };
  }else{
    await send502(res);
    return;
  };
};
const {gzip} = require("node-gzip");
const dir = process.cwd();
const dbSocket = require(dir+"/core/db-socket");
const send504 = require(dir+"/core/send-504");
const send404 = require(dir+"/core/send-404");
const createPageSitemapChild = require(dir+"/core/create-page-sitemap-child");
const config = require(dir+"/config.json");

module.exports = async (req,res,ws,status,url)=>{
  const pathname = url.pathname;
  const file =  await pathname.replace(config["path-sitemap-urlset"],"").replace(".xml",".zip");
  const data = await dbSocket(ws,{
    "get":"sitemapchild",
    "file":file
  });
  if(data.status){
    if(typeof data.db=="object"){
      if(data.db.data && typeof data.db.data=="object"){
        let dom = await createPageSitemapChild(data.db.data,url);
        dom = await gzip(dom);
        res.writeHead(200,{
          "content-type":"text/xml; charset=UTF-8",
          "content-encoding":"gzip"
        });
        res.write(dom);
        return res.end();
      }else{
        await send404(res);
        return;
      };
    }else{
      await send404(res);
      return;
    };
  }else{
    if(data.code==504){
      await send504(res);
      return;
    }else{
      await send404(res);
      return;
    };
  };
};
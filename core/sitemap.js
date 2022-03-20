const dir = process.cwd();
const dbSocket = require(dir+"/core/db-socket");
const send504 = require(dir+"/core/send-504");

module.exports = async (req,res,ws,status,url)=>{
  const data = await dbSocket(ws,{
    "get":"sitemapindexh"
  });
  if(data.status){
    console.log(data.db);
    res.write("page sitemap");
    return res.end();
  }else{
    if(data.code==504){
      await send504(res);
      return;
    }else{
      res.write("404");
      return res.end();
    };
  };
};
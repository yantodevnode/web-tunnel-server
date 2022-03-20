const dir = process.cwd();
const dbSocket = require(dir+"/core/db-socket");
const send504 = require(dir+"/core/send-504");
const send404 = require(dir+"/core/send-404");

module.exports = async (req,res,ws,status,url)=>{
  const data = await dbSocket(ws,{
    "get":"sitemapindex"
  });
  if(data.status){
    if(typeof data.db=="object"){
      if(data.db.data && typeof data.db.data=="object"){
        res.write(JSON.stringify(data.db.data));
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
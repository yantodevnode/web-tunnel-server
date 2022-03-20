const dir = process.cwd();
const dbSocket = require(dir+"/core/db-socket");

module.exports = async (req,res,ws,status,url)=>{
  const data = await dbSocket(ws,{
    "get":"sitemapindex"
  });
  if(data.status){
    res.write("page sitemap");
    return res.end();
  }else{
    res.write(data.db);
    return res.end();
  };
};
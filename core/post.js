const {gzip} = require("node-gzip");
const dir = process.cwd();
const dbSocket = require(dir+"/core/db-socket");
const send504 = require(dir+"/core/send-504");
const send404 = require(dir+"/core/send-404");
const createPagePost = require(dir+"/core/create-page-post");

module.exports = async (req,res,ws,status,url,fileName,id)=>{
  const data = await dbSocket(ws,{
    "get":"post",
    "file":fileName+".zip",
    "id":id
  });
  if(data.status){
    if(typeof data.db=="object"){
      if(data.db.data && typeof data.db.data=="object"){
        let dom = await createPagePost(data.db.data,url,fileName,id);
        dom = await gzip(dom);
        res.writeHead(200,{
          "content-type":"text/html; charset=UTF-8",
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
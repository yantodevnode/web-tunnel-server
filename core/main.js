const dir = process.cwd();
const dbSocket = require(dir+"/core/db-socket");
const send502 = require(dir+"/core/send-502");

module.exports = async (req,res,ws,status,url)=>{
  if(ws && status){
    const pathname = url.pathname;
    console.log(pathname)
    res.write("ok");
    return res.end();
  }else{
    await send502(res);
    return;
  };
};
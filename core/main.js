const dir = process.cwd();
const send502 = require(dir+"/core/send-502");

module.exports = async (req,res,ws,status)=>{
  if(ws && status){
    res.write("ok");
    return res.end();
  }else{
    await send502(res);
    return;
  };
};
const textToImage = require('text-to-image');
const dir = process.cwd();
const crypto = require(dir+"/core/crypto");
const send404 = require(dir+"/core/send-404");

module.exports = async (res,val)=>{
  const decVal = await crypto.dec(val,"");
  if(decVal.length>0){
    return res.end("image");
  }else{
    await send404(res);
    return;
  };
};
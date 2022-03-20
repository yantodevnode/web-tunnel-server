const dir = process.cwd();
const send404 = require(dir+"/core/send-404");
const textToPicture = require('text-to-picture');

module.exports = async (res,val)=>{
  const decVal = await atob(decodeURIComponent(val));
  if(decVal.length>0){
    const result = await textToPicture.convert({
      text: decVal[0],
      quality:1
    });
    const buf = await result.getBuffer();
    await res.write(buf);
    return res.end();
  }else{
    await send404(res);
    return;
  };
};
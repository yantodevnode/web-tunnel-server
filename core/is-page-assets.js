const fs = require("fs");
const dir = process.cwd();

module.exports = async (pathname)=>{
  const listFile = await fs.readdirSync(dir+"/assets",{
    withFileTypes:true
  }).filter(item=>item.isFile()).map(item=>item.name);
  let backSend = {
    "status":false,
    "dir":null
  };
  for(let name of listFile){
    if("/"+name==pathname){
      backSend.status = true;
      backSend.dir = dir+"/assets/"+name
      break;
    };
  };
  return backSend;
};
const dir = process.cwd();
const config = require(dir+"/config.json");

module.exports = async (ws,data)=>{
  let sendBack = {
    "status":false,
    "db":null
  };
  return new Promise((resolve)=>{
    try{
      ws.timeout(config["time-waitting-response-client"]).emit("request",data,(err, response) => {
        if(err){
          sendBack.db=String(err);
          resolve(sendBack);
        }else{
          sendBack.status=true;
          sendBack.db=response;
          resolve(sendBack);
        };
      });
    }catch(e){
      resolve(sendBack);
    };
  });
};
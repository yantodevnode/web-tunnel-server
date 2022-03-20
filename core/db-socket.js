const dir = process.cwd();
const config = require(dir+"/config.json");

module.exports = async (ws,data)=>{
  let sendBack = {
    "status":false,
    "code":404,
    "db":null
  };
  return new Promise((resolve)=>{
    try{
      ws.timeout(config["time-waitting-response-client"]).emit("request",data,(err, response) => {
        if(err){
          sendBack.code=504;
          sendBack.db=String(err);
          resolve(sendBack);
        }else{
          if(response.status && response.data && response.message){
            sendBack.code=200;
            sendBack.status=true;
            sendBack.db=response;
            resolve(sendBack);
          }else{
            sendBack.status=false;
            sendBack.db=response;
            resolve(sendBack);
          };
        };
      });
    }catch(e){
      resolve(sendBack);
    };
  });
};
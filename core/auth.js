const token = process.env['token-auth-websocket'];

module.exports = async (socket,next,status)=>{
  if(status){
    return next(new Error("Client ready in server..."));
  }else{
    const auth = socket.handshake.auth;
    if(auth.key==token){
      socket.handshake["connet-to-client"]=true;
      return next();
    }else{
      return next(new Error("Authentication Token Error..."));
    };
  };
};
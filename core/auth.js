const token = process.env['token-auth-websocket'];

module.exports = async (socket,next)=>{
  return next();
};
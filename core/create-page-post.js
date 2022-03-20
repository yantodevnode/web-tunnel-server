const fs = require("fs");
const dir = process.cwd();
const config = require(dir+"/config.json");

module.exports = async (data,url,fileName,id)=>{
  const pathname = url.pathname;
  const lang = config.lang;
  const author = config.author;
  const title = data.title;
  const description = data.description;
  const quest = data.quest;
  const timeIso = new Date(Number(data.time)*1000).toISOString();
  const uri = url.origin+pathname;
  const hostname = url.hostname;
  const origin = url.origin;
  const href = url.href;
  const query = url.query;
  console.log(url,data);
  let dom = await fs.readFileSync(dir+"/template/post.html","utf-8");
  
  dom = await dom.replace(/\$\{lang\}/g,lang)
  .replace(/\$\{author\}/g,author)
  .replace(/\$\{title\}/g,title)
  .replace(/\$\{description\}/g,description)
  .replace(/\$\{quest\}/g,quest)
  .replace(/\$\{time-iso\}/g,timeIso)
  .replace(/\$\{url\}/g,uri)
  .replace(/\$\{hostname\}/g,hostname)
  .replace(/\$\{origin\}/g,origin)
  .replace(/\$\{query\}/g,query)
  .replace(/\$\{href\}/g,href)
  
  return dom;
};
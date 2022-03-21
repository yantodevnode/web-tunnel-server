const fs = require("fs");
const dir = process.cwd();
const config = require(dir+"/config.json");

module.exports = async (data,url,fileName,id)=>{
  const pathname = url.pathname;
  const lang = config.lang;
  const author = config.author;
  const title = data.title.replace(/(?:\r\n|\r|\n)/g, '');
  const countRating = title.length;
  const description = data.description;
  const quest = data.quest;
  let answer = "";
  if(data.answer.length>0){
    answer+=`<h2 class='h4 area-answer'>JAWABAN :</h2>`;
  };
  for(let aa of data.answer){
    answer+=`<div>`+aa+`</div>`;
  };
  const timeIso = new Date(Number(data.time)*1000).toISOString();
  const uri = url.origin+pathname;
  const hostname = url.hostname;
  const origin = url.origin;
  const href = url.href;
  const query = url.query;
  const encImage = await encodeURIComponent(title);
  const image =  "https://cdn.statically.io/og/fontsize=80px/"+encImage+".jpeg";
  let dom = await fs.readFileSync(dir+"/template/post.html","utf-8");
  
  dom = await dom.replace(/\$\{lang\}/g,lang)
  .replace(/\$\{author\}/g,author)
  .replace(/\$\{title\}/g,title)
  .replace(/\$\{description\}/g,description)
  .replace(/\$\{image\}/g,image)
  .replace(/\$\{quest\}/g,quest)
  .replace(/\$\{answer\}/g,answer)
  .replace(/\$\{count-rating\}/g,countRating)
  .replace(/\$\{time-iso\}/g,timeIso)
  .replace(/\$\{url\}/g,uri)
  .replace(/\$\{hostname\}/g,hostname)
  .replace(/\$\{origin\}/g,origin)
  .replace(/\$\{query\}/g,query)
  .replace(/\$\{href\}/g,href)
  
  return dom;
};
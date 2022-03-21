const timeEl =document.getElementById("time-read");
if(timeEl){
  const dataTime = timeEl.getAttribute("data");
  const timeFormat = moment(dataTime).format('DD MMMM YYYY, h:mm:ss a');
  timeEl.innerText = timeFormat;
};
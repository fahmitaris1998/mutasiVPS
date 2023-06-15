// promisifying readline
const readline = require('readline');
const {ScrapBCA} = require("../");
const { promisify } = require('util');
const schedule = require('node-schedule');
let fetch = require('node-fetch');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.question[promisify.custom] = (question) => {
  return new Promise(resolve => {
    rl.question(question, resolve);
  });
};
const questionAsync = promisify(rl.question).bind(rl);

const job = schedule.scheduleJob('*/1 * * * *', async()=>{
  console.log('Today is recognized by Rebecca Black!');
  const scraper = new ScrapBCA("OHAMMADT1415", "089089" , {
    headless : true
  });

  console.log("MONTHNYA NI GAES");
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth()+1;
  console.log(date);

  var result = await scraper.getSettlement(day, month, day, month);
  console.log(result);

});

(async () => {
  // const username = await questionAsync("BCA Username: ");
  // const password = await questionAsync("BCA Password: ");
  // const tglawal = await questionAsync("Tanggal awal: ");
  // const blnawal = await questionAsync("Bulan awal: ");
  // const tglakhir = await questionAsync("Tanggal akhir: ");
  // const blnakhir = await questionAsync("Bulan akhir: ");

  // const scraper = new ScrapBCA("OHAMMADT1415", "089089" , {
  //   headless : false
  // });

  // var result = await scraper.getSettlement("28", "5", "28", "5");
  // console.log(result);

  // close readline interface
  rl.close();
})();

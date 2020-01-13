const { parentPort } = require('worker_threads');
const fs = require('fs');
const path = require('path')

// get current data in DD-MM-YYYY format
let date = new Date();
let currDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

// recieve crawled data from main thread
parentPort.once("message", (content) => {
    console.log("Recieved data from mainWorker...");
    fs.writeFile(path.join(__dirname, '../db/' + currDate + '.json'), JSON.stringify(content), 'utf8', function(err){
        //如果err=null，表示文件使用成功，否则，表示希尔文件失败
        if(err) {
            console.log('写文件出错了，错误是：' + err);
        }  else {
            // send data back to main thread if operation was successful
            parentPort.postMessage("Data saved successfully");
        } 
    })    
});
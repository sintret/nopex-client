var cron = require('node-cron');
var request = require("request");


async function send() {
    
}

var myTasks = {}

myTasks.send = cron.schedule('* * * * *', async () => {

    send()

}, {
    scheduled: true
});

module.exports = myTasks;


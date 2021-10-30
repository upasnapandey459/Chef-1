const fileName = `scheduler.js`;
const logger = require('./logger');
const schedule = require('node-schedule');
const userModel = require("../../models/userModel");
const FIRESTORE = require("../../Firestore/firestore");
const NOTIFICATION_HELPER = require("../../Notification/notification");

module.exports.expireCreditPoints = async()=>
{
    try
    {
        logger.info(`${fileName} expireCreditPoints() called`);
        const job = schedule.scheduleJob('* 0 * * * *',async function(){
            console.log('I am the Credits SCHEDULER and I have started my work');
            let time = new Date().getTime();
            time = time-4320000000;// 50 days in miliseconds
            // time = time-432;// 50 days in miliseconds
            let details = await userModel.expireCreditPoints(time);
            if(details.rowCount>0)
            {
                let title = 'Credits Expired';
                let message = 'Your Credit point are expired because of inactivity in orders';
                for(let i=0;i<details.rowCount;i++)
                {
                    let userid = details.rows[0].key;
                    await NOTIFICATION_HELPER.sendNotification(userid,title,message);
                    await FIRESTORE.addCredits(0,userid);
                }
            }
        });
    }
    catch(error)
    {
        logger.error(`${fileName} expireCreditPoints() error : ${error}`);
    }
}
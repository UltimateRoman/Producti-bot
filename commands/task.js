const task_queue = require("../sqlitedb");

module.exports = {
	name: 'task',
	aliases: [],
	description: 'helps user organize their tasks by adding them to a queue',
	execute: async(message, args, client)=>{
	
		if(args.length < 1){
			message.channel.send('error: no time or time interval given'); return;
        }
    
    const userID = message.author.id;

    var expectedArg1 = /(\d+)\:(\d+)/i;  // number:number, as a time value

    if(args.length >= 2 && expectedArg1.test(args[0])){
        var time = args[0].match(expectedArg1);
        console.log(time); // hours group stored in time[1], minutes group stored in time[2]
        
        if(time[1] < 0 || time[1] > 23 || time[2] < 0 || time[2] > 59){
            message.channel.send('error: given time not valid'); return;
        }
        
        var scheduledTime = new Date(); 
        scheduledTime.setHours(time[1]); scheduledTime.setMinutes(time[2]); scheduledTime.setSeconds(0); scheduledTime.setMilliseconds(0);
        var waitTime = scheduledTime.getTime() - Date.now();
        if(waitTime < 0){ waitTime += 86400000; } // increment by a day

        if(args.length > 1){
            try {
                const tag = await task_queue.create({
                    taskname: args.slice(1).join(' '),
                    user: client.users.cache.get(userID).username,
                    start_hour: time[1],
                    start_min: time[2],
                });
                message.channel.send('Task added to your schedule.').then(() => {
                    client.setTimeout(() => client.users.cache
                        .get(userID)
                        .send(
                            "Hey! It's time for your task: " + 
                            args.slice(1).join(' ')
                    ), waitTime);
                });
            }
            catch (e) {
                if (e.name === 'SequelizeUniqueConstraintError') {
                    console.log('That tag already exists.');
                }
                console.log(e);
            }
            return;
        }
    }
    }

}
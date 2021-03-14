const task_queue = require("../sqlitedb");
const users = require("../sqlitedb-users");

module.exports = {
	name: 'task',
	aliases: [],
	description: 'helps user organize their tasks by adding them to a queue',
	usage: '!task [time(24 hours)] [task description]',
	execute: async(message, args, client)=>{
	
		if(args.length < 1){
			message.channel.send('error: no time or time interval given'); return;
        	}
    
		const userID = message.author.id;

		var expectedArg1 = /(\d+)\:(\d+)/i;  // number:number, as a time value

		if(args.length >= 2 && expectedArg1.test(args[0])){
			var time = args[0].match(expectedArg1);
			//console.log(time); // hours group stored in time[1], minutes group stored in time[2]

			if(time[1] < 0 || time[1] > 23 || time[2] < 0 || time[2] > 59){
				message.channel.send('error: given time not valid'); return;
			}
        
 			var scheduledTime = new Date(); 
			scheduledTime.setHours(time[1]); scheduledTime.setMinutes(time[2]); scheduledTime.setSeconds(0); scheduledTime.setMilliseconds(0);
			
			var waitTime = scheduledTime.getTime() - (scheduledTime.getTimezoneOffset() * 60000) - Date.now();
			var start_h = time[1];
			var start_m = time[2];

			const userEntry = await users.findOne({ where: {user_id:message.author.id} });
			if(userEntry){
				//console.log('found timezone'); console.log(offset);
				var offset = await userEntry.get('timezone');
				waitTime -= offset;
				offset_h = Math.floor(offset / 3600000);
				start_h = (start_h - offset_h) % 24;
				offset %= 3600000;
				offset_m = Math.floor(offset / 60000);
				start_m = (start_m - offset_m) % 24;
			}

			while(waitTime < 0){ waitTime += 86400000; } // increment by a day
        

			if(args.length > 1){
				try {
					const tag = await task_queue.create({
						taskname: args.slice(1).join(' '),
						user: client.users.cache.get(userID).username,
						start_hour: start_h,
						start_min: start_m,
					});
					//message.react('✅');
					
					message.channel.send('Task added to your schedule.').then(() => {
						// send reminder, but only if task is not completed in schedule
						client.setTimeout(async () => {
							var taskToRemind = await task_queue.findOne({
								where: {
									taskname: args.slice(1).join(' '),
									user: client.users.cache.get(userID).username
								}
							});
							if(taskToRemind && !taskToRemind.completed){			
								client.users.cache.get(userID).send("Hey! It's time for your task: ***" + args.slice(1).join(' ') + "***");
							}
                				}, waitTime);
		
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
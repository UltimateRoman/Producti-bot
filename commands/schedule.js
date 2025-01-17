const task_queue = require('../sqlitedb');
const users = require('../sqlitedb-users');

module.exports = {
	name: 'schedule',
	aliases: [],
	description: 'displays the current queue of scheduled tasks and their status',
	usage: '!schedule',
	execute: async(message, args, client)=>{
        
		const authorID = message.author.id
		const taskObj = await task_queue.sync();
        

		let tasks = [];
		const myTasks = await task_queue.findAll({ where: { user: client.users.cache.get(authorID).username } })
		
		await Promise.all(myTasks.map(async (task) => {	
			const taskName = task.taskname;
			
			var start_h = task.start_hour; var start_m = task.start_min;
			userEntry = await users.findOne({ where: {user_id:message.author.id} });
			if(userEntry){
				var offset = await userEntry.get('timezone'); // offset is in milliseconds, so need to convert
				offset_h = Math.floor(offset / 3600000);
				offset %= 3600000; offset_m = Math.floor(offset / 60000);
				start_h = (start_h + offset_h) % 24;
				start_m = (start_m + offset_m) % 60;
			}

			if(start_m < 10){ start_m = '0' + start_m; }		
			
			const startTime = `${start_h}:${start_m}`;
			const status = task.completed ? "Completed" : "Not completed";
			tasks.push({ taskName: taskName, startTime: startTime , status: status})
			return Promise.resolve();
		}))
        
		if(tasks.length != 0) {
			await message.channel.send("**Your schedule for today:**");
			tasks.forEach((task,id) => {
				message.channel.send(`${id+1}. **${task.taskName}** @ ${task.startTime} hours , Task status: ${task.status}`)		
			})
			await message.channel.send("react with ✅ to mark a task as complete, ❎ to mark a task as not complete, or ❌ to delete a task.");
		}
		else {
			await message.channel.send("**You have no tasks scheduled for today.**");
		}
	}
    
}
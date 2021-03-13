const task_queue = require('../sqlitedb');

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
            const startTime = `${task.start_hour} : ${task.start_min}`;
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
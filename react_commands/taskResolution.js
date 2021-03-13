const task_queue = require('../sqlitedb');

module.exports = {
	emoji: '✅',
	aliases: [],
	description: 'resolves the task reacted to from !schedule',
	usage: '',
	execute: async(reaction, user) => {

		var messageData = reaction.message.content.split('**'); // if reaction is to a valid task from !schedule, messageData[1] should be the task
		//console.log(messageData); // debug

		if(messageData.length < 2){ return; }
		const taskReacted = await task_queue.findOne({
			where: {
				taskname:messageData[1],
				user: user.username
			}
		});
		
		if(taskReacted){
			reaction.message.channel.send('Task: \"' + messageData[1] + '\" completed!');
			await task_queue.update({ completed: true }, {
				where: {
					taskname:messageData[1],
					user: user.username
				}
			});
		}
	
	}, // end of execute
};
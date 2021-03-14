const task_queue = require('../sqlitedb');

module.exports = {
	emoji: '✅',
	aliases: [],
	description: 'resolves the task reacted to from !schedule',
	usage: '',
	execute: async(reaction, user, client) => {

		var messageData = reaction.message.content.split('**'); // if reaction is to a valid task from !schedule, messageData[1] should be the task
		//console.log(messageData); // debug

		const memes = ['https://brobible.com/wp-content/uploads/2020/10/50-best-memes-iq-joke-math.jpg',
                'https://petpress.net/wp-content/uploads/2019/12/corgi-12.jpg',
                'https://www.rd.com/wp-content/uploads/2019/04/01-Hilarious-Dog-Memes.jpg',
                'https://brobible.com/wp-content/uploads/2020/09/50-best-memes-understanding-jokes.jpg',
				'https://petpress.net/wp-content/uploads/2019/12/corgi-1.jpg',
				'https://preview.redd.it/p2htn4m2olh21.png?width=960&crop=smart&auto=webp&s=45ff517fec9fce9dee6d3f96bd326259ec5b5a3a',
				'https://brobible.com/wp-content/uploads/2020/10/50-best-memes-same-tv-shows.jpg',
				'https://cdn.vox-cdn.com/thumbor/HWmEqvQy7JSOcFqh1mYE8CDyCf0=/0x38:1920x1043/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/15960038/ply_best_memes_2019.jpg',
				'https://brobible.com/wp-content/uploads/2020/08/50-best-memes-public-vs-headphones.jpg',
				'https://memesbams.com/wp-content/uploads/2017/10/7-Cute-Cat-Memes.jpg'
                ]

		if(messageData.length < 2){ return; }
		const taskReacted = await task_queue.findOne({
			where: {
				taskname:messageData[1],
				user: user.username
			}
		});
		
		if(taskReacted){
			reaction.message.channel.send('🌟 Task: \"***' + messageData[1] + '***\" completed! 🌟 Check your DM for the reward!');
			const meme_num = Math.floor(Math.random() * 5);
			const meme_link = memes[meme_num];
			client.users.cache.get(user.id).send("Congrats on completing '" + messageData[1] +  "' 🌟 Here's your reward!",{files: [meme_link]});
			await task_queue.update({ completed: true }, {
				where: {
					taskname:messageData[1],
					user: user.username
				}
			});
		}
	
	}, // end of execute
};
const task_queue = require('../sqlitedb');

module.exports = {
	name: 'help',
	aliases: [],
	description: 'displays the set of commands and their usage',
	usage: '!help [command]',
	execute(message, args, client){

		const commands_data = [];
		const { commands } = message.client;

		if(args.length > 0){
			if(!commands.has(args[0])){ message.channel.send('Sorry, but that command does not exist.'); return; }
			command = commands.get(args[0]);
			commands_data.push(`**Name:** ${command.name}\n**Description:** ${command.description}\n**Usage:** ${command.usage}`);
			message.author.send(commands_data.join(' '), { split: true });
		}
		else{
			commands_data.push("🌟🌟🌟 Hi! I'm **Producti-Bot** 🌟🌟🌟, here to help you better organize your schedule and improve your productivity! \n Currently, I support the following commands:\n✨");
			commands.map((command, id) => {
				commands_data.push(` ***${command.name}***  |`);
			})
			var lastitem = commands_data.pop().slice(0, -2);
			commands_data.push(lastitem);
			commands_data.push(`✨`);
        		commands_data.push(`\n Use !help [command] to receive a private message about a given command.`);
			message.channel.send(commands_data.join(' '), { split: true });
		}
	}
    
}
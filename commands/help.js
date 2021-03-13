const task_queue = require('../sqlitedb');

module.exports = {
	name: 'help',
	aliases: [],
    description: 'displays the set of commands and their usage',
    usage: '!help',
	execute(message, args, client){
        
        const commands_data = [];
        const { commands } = message.client;

        commands_data.push("🌟🌟🌟 Hi! I'm **Producti-Bot** 🌟🌟🌟, here to help you better organize your schedule and improve your productivity! \n Currently, I support the following commands:");
        commands.map((command, id) => {
            commands_data.push(` \n ***${command.name}*** - ${command.description} ✨`);
            commands_data.push(`Usage: ${command.usage}`)
        })
        
            
        message.channel.send(commands_data, { split: true });
        }
    
}
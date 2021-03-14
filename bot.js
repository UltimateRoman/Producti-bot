const Discord = require('discord.js');
const fs = require('fs');

task_queue = require('./sqlitedb');
users = require('./sqlitedb-users');

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.reactCommands = new Discord.Collection();

const{ prefix, token } = require('./config.json');


//===== startup bot =====//

console.log('Starting bot');
client.login(token);

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const reactFiles = fs.readdirSync('./react_commands').filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

for (const file of reactFiles) {
	const command = require(`./react_commands/${file}`);
	client.reactCommands.set(command.emoji, command); // react_commands files have an emoji field instead of name, but it functions identically
}

//===== bot commands =====//

client.once('ready', () => {
	console.log('Bot setup successful');
	task_queue.sync({force: true});
	users.sync({force: true});
}); // end of client.once ready


client.on('messageReactionAdd', async (reaction, user) => {

	if(reaction.partial){
		try{
			await reaction.fetch();
		}catch(error){
			console.error('an error occurred while fetching the reaction: ', error);
			return;
		}
	}

	if(reaction.message.author.id === client.user.id){ // reaction is to the bot client's message
		//console.log(reaction.emoji);	// debug

		if(!client.reactCommands.has(reaction.emoji.name)){ console.log('reaction command not found'); return; }

		try{
			client.reactCommands.get(reaction.emoji.name).execute(reaction, user, client);
		}catch(error){
			console(error);
			message.channel.send('An unknown error occurred');
		}
		
	}

}); // end of client.on messageReactionAdd


client.on('message', message => {
	if(!message.content.startsWith(prefix) || message.author.bot){ return; }

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if(!client.commands.has(command)){ console.log('command not found'); return; }

	try{
		client.commands.get(command).execute(message, args, client);
	}catch(error){
		console.error(error);
		message.channel.send('An unknown error occurred.');
	}
}); // end of client.on message

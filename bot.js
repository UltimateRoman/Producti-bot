const Discord = require('discord.js');
const fs = require('fs');

const client = new Discord.Client();

const{ prefix, token } = require('./config.json');


//===== startup bot =====//

console.log('Starting bot');
client.login(token);

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

//===== bot commands =====//

client.once('ready', {

	console.log('Bot setup successful');

}); // end of client.once ready


client.on('message', message => {
	if(!message.content.startsWith(prefix) || message.author.bot){ return; }

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if(!client.commands.has(command)){ return; }

	try{
		bot.commands.get(command).execute(message, args);
	}catch(error){
		console.error(error);
		message.channel.send('An unknown error occurred.')
	}
}); // end of client.on message
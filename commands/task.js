module.exports = {
	name: 'task',
	aliases: [],
	description: 'helps user organize their tasks by adding them to a queue',
	execute(message, args){
	
		if(args.length < 1){
			message.channel.send('error: no time or time interval given'); return;
        }
    }

    
}
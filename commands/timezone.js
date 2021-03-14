const users = require("../sqlitedb-users");

module.exports = {
	name: 'timezone',
	aliases: [],
	description: 'allows user to set their own timezone for task reminders using an offset from UTC time',
	usage: '!timezone [+/-offset]',
	execute: async(message, args, client)=>{	
		if(args.length < 1){
			message.channel.send('error: no time offset given'); return;
		}

		var expectedArg1 = /^([\+\-])?(\d+)(?:\:)?(\d+)?$/i;  // +/-number, as a time offset. Also accepts +/-number:number
		
		if(expectedArg1.test(args[0])){
			var time = args[0].match(expectedArg1);
			//console.log(time); // sign stored in time[1], hours group stored in time[2], optional minutes group stored in time[3]
		}else{
			message.channel.send('error: incorrect timezone offset formatting');
		}

		var timezone_offset = 0;
		if(time[1] === '-'){
			timezone_offset -= 3600000 * time[2]; // hours
			if(typeof time[3] != 'undefined'){ timezone_offset -= 60000 * time[3]; } // optional minutes
		}else{
			timezone_offset += 3600000 * time[2];		
			if(typeof time[3] != 'undefined'){ timezone_offset += 60000 * time[3]; } 
		}	
		
		
		try {
			var userEntry = await users.findOne({ where: { user_id: message.author.id } });
			if(userEntry){
				await users.update({ timezone: timezone_offset }, { where: { user_id: message.author.id } });
			}
			else{
				const userEntry = await users.create({
					user_id: message.author.id,
					timezone: timezone_offset
				});
			}
		}
		catch (e) {
			console.log(e);
		}
		message.channel.send('Timezone successfully set');
		return;

	}

}
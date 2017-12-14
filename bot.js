var Discord = require('discord.io');
var auth = require('./auth.json');
var temp = 1;									// sets a switch for triggering command
var temp2 = 1;

var bot = new Discord.Client ({
    token: auth.token,
    autorun: true
});

bot.on('ready', function(evt) {
    console.log('[' + Date() + ']' + 'Connected');
    console.log('[' + Date() + ']' + 'Logged in as: ');
	console.log('[' + Date() + ']' + bot.username + ' - (' + bot.id + ')');
	
	bot.setPresence({
        game: {name: "with Aoko"}
	});
});

bot.on('message', function(user, userID, channelID, message, evt) {
		
	//catch messages starting with the wildcard
	if(message.substring(0, 1) == '%') {
		var arg = message.substring(1).split(' ');		
		var command = arg[0];						// gets the first word in the command
		
		
		arg = arg.splice(1);	// gets rid of the other words and returns the one needed
								// currently not used - might use it in the future for response messages
		
		switch(command)
		{
			case 'berika':
			{
				if(temp == 1) {
					bot.sendMessage({
						to: channelID,
						message: "https://cdn.discordapp.com/attachments/346822170732920834/387823602273353748/DQU8a8RVQAEg0W4.png" // message to send
					});
				
					var interval = setInterval (function (){
						bot.sendMessage({
						to: channelID,
						message: "https://cdn.discordapp.com/attachments/346822170732920834/387823602273353748/DQU8a8RVQAEg0W4.png" // message to send
						});
					}, 3600000); // time between each interval in milliseconds
				}
				temp = 0;
			}
			break;
			case 'neru':
			{
				if(temp2 == 1) {
					bot.sendMessage({
						to: channelID,
						message: "https://pbs.twimg.com/media/DQpe7WfU8AAgPlG.jpg:orig"
					});
					
					var interval = setInterval (function (){
						bot.sendMessage({
							to: channelID,
							message: "https://pbs.twimg.com/media/DQpe7WfU8AAgPlG.jpg:orig"
						});
					}, 3600000);
				}
				
				temp2 = 0;
			}
			break;
			default:
			{
				bot.sendMessage({
				  to: channelID,
				  message: ":whale2: Aoko doesn't recognise that command."
				});
			}
			break;
		}
	} 
});

bot.on("disconnect", function() {
    console.log('[' + Date() + ']' + 'Bot disconnected');
	bot.connect(); //Auto reconnect
});

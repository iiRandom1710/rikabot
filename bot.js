var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var temp = 1;									// sets a switch for triggering command
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});

logger.level = 'debug';

var bot = new Discord.Client ({
    token: auth.token,
    autorun: true
});

bot.on('ready', function(evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
	logger.info(bot.username + ' - (' + bot.id + ')');
	
	bot.setPresence({
	  game: {name: "with Aoko"}
	});
	
	
});

bot.on('message', function(user, userID, channelID, message, evt) {
		
	//catch messages starting with the wildcard
	if(message.substring(0, 1) == '%') {
		var arg = message.substring(1).split(' ');		
		var command = arg[0];							// gets the first word in the command
		
		
		arg = arg.splice(1);							// gets rid of the other words and returns the one needed
														// currently not used - might use it in the future for response messages
		
		switch(command)
		{
			case 'berika':
			{
				if(temp==1) {
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
	logger.info('Bot disconnected');
	bot.connect() //Auto reconnect
	logger.info('Reconnected');
});
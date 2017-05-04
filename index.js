// Import the discord.js module
const discord = require('discord.js')

// Create an instance of Discord that we will use to control the bot
const bot = new discord.Client();

// Token for your bot, located in the Discord application console - https://discordapp.com/developers/applications/me/
const token = 'MzA4OTczMTU2NTc4ODg1NjMy.C-zYYw.i5kCT8X6Q0h76Oh85zNAEsE1WTE'

// test channel
var welcomeChannel;

 
 // Gets called when our bot is successfully logged in and connected
bot.on('ready', () => {
	welcomeChannel = bot.channels.get("308968674721792002");
    console.log('Let\'s celebrate birthdays!!');
});

 // This code will run once the bot receives any message.
bot.on("message", function (msg) {
	// if message begins with "ping"
	if (msg.channel === welcomeChannel && msg.content.indexOf("ping") === 0) {
		// send a message to the channel the ping message was sent in.
		welcomeChannel.send("pong!");

		// alert the console
		console.log("pong-ed " + msg.author.username);
	}
});
  
 bot.login(token);
 
 // link to join the server: https://discordapp.com/oauth2/authorize?client_id=308973156578885632&scope=bot
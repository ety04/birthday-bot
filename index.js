// Import the discord.js module
const Discord = require('discord.js')

// Import the birthday table
const Table = require('easy-table')

// Create an instance of Discord that we will use to control the bot
const bot = new Discord.Client();

// Token for your bot, located in the Discord application console - https://discordapp.com/developers/applications/me/
const token = 'MzA4OTczMTU2NTc4ODg1NjMy.C-zYYw.i5kCT8X6Q0h76Oh85zNAEsE1WTE'

// test channel
var welcomeChannel;

// Birthday data
var data = [
  { id: 212699799730913281, birth: '15/07' },	// Ety
  { id: 154809485116964864, birth: '12/08'},	// Kyos
  { id: 154809485116964864, birth: '12/08'},	// Kyos
  { id: 308973156578885632, birth: '08/05'}	// Birthday-bot
]

var t = new Table

data.forEach(function(element) {
  t.cell('Product Id', element.id)
  t.cell('Description', element.birth)
  t.newRow()
})

console.log(t.toString())

 
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
	// if message begins with "birth"
	if (msg.channel === welcomeChannel && msg.content.startsWith("!birth")) {
		let args = msg.content.split(" ").slice(1);
		let birthday_date = args[0]; // yes, start at 0, not 1. I hate that too.
		welcomeChannel.send("Changed ${msg.author.name}\'s birthday to ${birthday_date} :FeelsBirthdayMan: ");
		}
});
  
 bot.login(token);
 
 // link to join the server: https://discordapp.com/oauth2/authorize?client_id=308973156578885632&scope=bot
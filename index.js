/* ---------------------------- *
* Birthday-bot v0.0.slmTie
* ~~~~~
* With the blessing of soloGod, a new race has been brought to the server: the Aegyl, with the user @birthday-bot. 
* birthday-bot is made only for your satisfaction, and will answer to specific commands that will be added below as you discover them.
* Message me if you have a command idea and they will be added! It will be written below as well... once the others have guessed it :japanese_ogre:
* ~~~~~
* birthday-bot is free to use, modify and redistribute. If you mention the creator, it's better.
* Creator: Ety... I mean soloman FeelsBirthdayMan
* License: LGPL-3.0
* Language: Javascript with Node.js
* Additional libraries: Discord.js, Systime, easy-table
* Initial use: Ety's Final Fantasy XII Discord server: Come join us here https://discord.gg/saKnTDj
 * ---------------------------- */

/** -------------------- IMPORTS ----------------------- */
   
// Import the discord.js module
const Discord = require('discord.js')

// Import the birthday table
const Table = require('easy-table')

// Import the systime module
const Systime = require('systime')


/** -------------------- GLOBAL VARIABLES ----------------------- */

// Create an instance of Discord that we will use to control the bot
const bot = new Discord.Client();

// Token for the bot, located in the Discord application console - https://discordapp.com/developers/applications/me/
const token = 'MzA4OTczMTU2NTc4ODg1NjMy.C-zYYw.i5kCT8X6Q0h76Oh85zNAEsE1WTE'

// channel used
var welcomeChannel;
const testing = "308968674721792002";
const random_talk = "232478667891015680";

// very important emoji
var emoji;

// Birthday data
const data = [
  //{ id: "118150122893737991", birth: 'today'},// Qazplm		// false
  { id: "159600065017675778", birth: '11/02'},	// Hoishin		// false
  { id: "112623145852080128", birth: '11/02'},	// Harvey
  { id: "107164123388735488", birth: '27/03'},	// Eden (and Flobber)
  { id: "113723104286605319", birth: '29/04'},	// Roosta
  { id: "193150846291279881", birth: '02/06'},	// Seth
  { id: "210538981509562391", birth: '05/06'},	// Deedlit
  { id: "84128419964551168",  birth: '06/07' },	// AlecK
  { id: "212699799730913281", birth: '15/07' },	// Ety
  { id: "113727842692497410", birth: '19/07'},	// Leo
  { id: "154809485116964864", birth: '12/08'},	// Kyos
  { id: "118150122893737991", birth: '24/08'},	// Qazplm		// false
  { id: "190204168257011712", birth: '16/09'},	// Bébert
  { id: "314797224695693314", birth: '03/10'},	// Blue
  { id: "199997219577790464", birth: '11/11'},	// Sarieux
  { id: "105135372484243456", birth: '15/11'},	// Coughchamp
  { id: "142722101961424896", birth: '24/11'}	// zer0skar
]

const botID = "308973156578885632";

var t = new Table
var time = new Systime()


/** -------------------- INTERNAL FUNCTIONS ----------------------- */
  
/**
 * -----> toDate
 * Creates a Date object from a string in "DD/MM" format, with current year
 * @param {String}	d	: the date of a user's birthday
 * @return {Date}			: still the date of a user's birthday FeelsAmazingMan
 */
function toDate(d)
{
		var today = new Date();
		if(d === "today")
			return today;
		var arr = d.split("/");													// arr[0] = day ; arr[1] = month
		const year = today.getFullYear();
		return new Date(year, arr[1] - 1, arr[0]);		// /!\ month begins with 0 (so we have to substract 1)
}

/**
 * -----> compare
 * Comparison function for the Javascript "sort" function - compares two Date objects
 * @param {Date}	a						: the date of a user's birthday
 * @param {Date}	b						: the date of another user's birthday
 * @return {int} comparison	: 1 if a>b; -1 if a<b; and 0 if a and b are the same date
 */
function compare(a, b) {

  const dateA = toDate(a.birth);
  const dateB = toDate(b.birth);
  
  let comparison = 0;
  if (dateA > dateB) {
    comparison = 1;
  } else if (dateA < dateB) {
    comparison = -1;
  }
  return comparison;
}

/**
 * -----> isToday
 * Says if the date is today (according to dates only, not the hour)
 * @param {Date}	d		: the date of a user's birthday
 * @return {boolean}	: true if the date is today, false if it is not
 */
function isToday(d)
{
	const today = new Date();
	if(d.getFullYear() === today.getFullYear() && d.getMonth() === today.getMonth() && d.getDate() === today.getDate())
		return true;
	else
		return false;
}

/**
 * -----> isPast
 * Says if the date is in the past (strict past according to dates only, not the hour)
 * @param {Date}	d		: the date of a user's birthday
 * @return {boolean}	: true if the date is past, false if it is not
 */
function isPast(d)
{
	const today = new Date();
	if(d.getFullYear() < today.getFullYear())
		return true;
	else if(d.getFullYear() === today.getFullYear() && d.getMonth() < today.getMonth())
		return true;
	else if(d.getFullYear() === today.getFullYear() && d.getMonth() === today.getMonth() && d.getDate() < today.getDate())
		return true;
	else
		return false;
}

/**
 * -----> isFuture
 * Says if the date is in the future (strict future according to dates only, not the hour)
 * @param {Date}	d		: the date of a user's birthday
 * @return {boolean}	: true if the date is future, false if it is not
 */
function isFuture(d)
{
	const today = new Date();
	if(d.getFullYear() > today.getFullYear())
		return true;
	else if(d.getFullYear() === today.getFullYear() && d.getMonth() > today.getMonth())
		return true;
	else if(d.getFullYear() === today.getFullYear() && d.getMonth() === today.getMonth() && d.getDate() > today.getDate())
		return true;
	else
		return false;
}

/**
 * -----> getDay
 * Returns the day of a Date (in letters) 
 * @param {Date}	d	: the date of a user's birthday
 * @return {String}	: the name of the date's day
 */
function getDay(d)
{
	const weekday = new Array(7);
	weekday[0] =  "Sunday";
	weekday[1] = "Monday";
	weekday[2] = "Tuesday";
	weekday[3] = "Wednesday";
	weekday[4] = "Thursday";
	weekday[5] = "Friday";
	weekday[6] = "Saturday";

	return weekday[d.getDay()];
}

/**
 * -----> getMonth
 * Returns the month of a Date (in letters) 
 * @param {Date}	d	: the date of a user's birthday
 * @return {String}	: the name of the date's month
 */
function getMonth(d)
{
	const monthNames = ["January", "February", "March", "April", "May", "June",
	  "July", "August", "September", "October", "November", "December"
	];
	return monthNames[d.getMonth()];
}

/**
 * -----> sendHappyBirthday
 * This is all what this bot's about! Happy birthday soloman! FeelsBirthdayMan
 * @param {data}	d	: an element of the data table (id + birth)
 * @return {void}
 */
function sendHappyBirthday(d)
{
	var u = bot.users.get(d.id);
	let wish = `Happy birthday ${u} ! Don\'t stay alone, go share your birthday party with soloman ${emoji}`;
	if(d.birth === "today")
		wish = randomWish(u);
	welcomeChannel.send(wish);
}

/**
 * -----> checkToday
 * Sends a message that says whose birthday it is today
 * @param {boolean} daily : says if the function has been called everyday or not
 * @return {void}
 */
function checkToday(daily)
{
	var snif = true;
	for(let d of data) {
		var aBirthday = toDate(d.birth);
		if(isToday(aBirthday))
		{
			snif = false;
			sendHappyBirthday(d)
		}
	}
	if(snif && !daily)
	{
		var bad = emoji = welcomeChannel.guild.emojis.find('name', 'FeelsBadMan');
		welcomeChannel.send(`It\'s no one\'s birthday today ${bad}`);
	}
}

/**
 * -----> randomWish
 * Returns a birthday wish for a person that has many, many birthdays
 * @param {User} u 			 : Discord user whom we want to send to wish to
 * @return {String} 				 : wish to send to the channel
 */
function randomWish(u)
{
	const wishes = [
	`It\'s great to have one\'s birthday everyday ${u}, don't you think? ${emoji}`,
	`Another birthday for ${u}. Soloman will be jealous ${emoji}`,
	`Again ${u} ! How many birthday bois do we have here? It gets too much ${emoji}`,
	`- Thanks ${u} - You're welcome solo. Happy birthday ${emoji} - Goddamit ${u}`,
	`Let's bake a birthday cake for ${u} together!! ${emoji}`,
	`Growing fast ${u}! Are you getting older than Vaan?! Soon we need an abs contest ${emoji}`,
	`It's been so long since last birthday, ${u}! Doctor Cid has given up on your case ${emoji}`,
	`Congratulations ${u} ! You just earned WR for birthdays. Sorry roosta ${emoji}`,
	`A new role called @SolomanRival is about to be created for ${u} ${emoji}`,
	`I was about to suggest a party for ${u} but... Rogue Tomato ate the birthday cake ${emoji}`,
	`I wonder if ${u} had more birthdays than Yiazmat has HP ${emoji}`,
	 `Balthier didn't manage to steal ${u}\'s birthday. Congratulations! ${emoji}`
	];
	return wishes[Math.floor(Math.random() * wishes.length)]
}

/**
 * -----> getBirthday
 * Returns the past or next birthday of the members
 * @param {boolean} next : true if we want next birthday; false if we want past birthday
 * @return {String} 				 : answer to send to the channel
 */
function getBirthday(next) {
	var yearHead =  new Date(new Date().getFullYear(),"00", "01");			// /!\ month begins with 0
	var pBirthday = yearHead;
	var u =  bot.user;
	var v = bot.user;
	// Check every birthday date we have
	for(let d of data) {
		var nBirthday = toDate(d.birth);
		// Next birthday has to be after Past birthday, and Past birthday... has to be past FeelsLifeMan
		if(isPast(nBirthday) && nBirthday >= pBirthday){
			pBirthday = nBirthday;
			u = bot.users.get(d.id);
		}
		// Next birthday has to be in the future: that's where we know last birthday is the one before that one
		else if(isFuture(nBirthday)){
			v = bot.users.get(d.id);
			if(!next)
				return `Last birthday : ${u} (${getDay(pBirthday)}, ${getMonth(pBirthday)} ${pBirthday.getDate()} ${yearHead.getFullYear()}). I hope your birthday cake was bigger than soloman's ${emoji}`;
			else
				return `Next birthday : ${v} (${getDay(nBirthday)}, ${getMonth(nBirthday)} ${nBirthday.getDate()} ${yearHead.getFullYear()}). I\'ll call soloman at once to prepare a celebratory swimming pool dance! Make sure you don\'t have Vaan\'s abs ${emoji}`;
		}
	}
}

/**
 * -----> atMention
 * Says a message when the bot is mentioned
 * @param {void}
 * @return {String} 				 : message to send to the channel
 */
function atMention()
{
	const needs = [
	"a cake",
	"a party",
	"a gift",
	"a ceremony",
	"an invitation",
	"a surprise",
	"a unicorn",
	"a song",
	"decorations",
	"flowers",
	"a Gaia hat",
	"a joke"
	];
	let word = needs[Math.floor(Math.random() * needs.length)];
	return `Always here for your birthday needs. Would you like ${word}? ${emoji}`;
}


/** -------------------- TIME EVENTS ----------------------- */
// Timer strats
/* time.on('second', () => {
	var u = bot.users.get("118150122893737991");
	welcomeChannel.send(randomWish(u));
})*/
// Daily notice
time.on('day', () =>
	checkToday(true)
)


/** -------------------- DISCORD EVENTS ----------------------- */
 // Gets called when our bot is successfully logged in and connected
bot.on('ready', () => {
	welcomeChannel = bot.channels.get(testing);
	emoji = welcomeChannel.guild.emojis.find('name', 'FeelsBirthdayMan');
	data.sort(compare)
	time.start()
    console.log('Let\'s celebrate birthdays!!');

	data.forEach(function(element) {
	  t.cell('User ID', element.id)
	  t.cell('Birthday', toDate(element.birth))
	  t.newRow()
	})

	console.log(t.toString())
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
		// ask for last birthday
		if (msg.channel === welcomeChannel && msg.content === "!birthday") {
			welcomeChannel.send(getBirthday(false)) ;
		}
		// ask for next birthday
		if (msg.channel === welcomeChannel && msg.content === "!next") {
			welcomeChannel.send(getBirthday(true)) ;
		}
		// date reminder
		if (msg.channel === welcomeChannel && msg.content.startsWith("!date")) {
			var today = new Date();
			welcomeChannel.send(`I never liked you but soloman told me to make an exception so here is the date: ${today} ${emoji}`);
		}
		// ask for today's birthdays
		if (msg.channel === welcomeChannel && msg.content === "!today") {
			checkToday(false)
		}
		// answer to mention
		if(msg.isMentioned(bot.users.get(botID)))
			msg.channel.send(atMention());
});

// When a new member joins the server
bot.on("serverNewMember", function (serv, u) {
		let w = serv.owner;
		welcomeChannel.send(`Welcome ${u} ! To be fully part of the adventure, don\'t forget to message ${w} with your birthday date ${emoji}`);
});
 
 
/** -------------------- LET'S GOOOOOOOOO ----------------------- */
 bot.login(token);
 
 
 // link for this bot to join the server: https://discordapp.com/oauth2/authorize?client_id=308973156578885632&scope=bot
 
 /* ---------------------------------------------------------------- *
*  End of life... I mean End of file FeelsBirthdayMan
 * ----------------------------------------------------------------- */

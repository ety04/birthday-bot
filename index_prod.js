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

// Import the funniest module
const sJoke = require('scrape_joke')

/** -------------------- GLOBAL VARIABLES ----------------------- */

// Create an instance of Discord that we will use to control the bot
const bot = new Discord.Client();

// Token for the bot, located in the Discord application console - https://discordapp.com/developers/applications/me/
const token = 'lol2017'

// channel used
var welcomeChannel, testChannel;
const testing = "t";
const random_talk = "rt";

// very important emoji
var emoji;

// Birthday data
const data = [
  //{ id: "m", birth: 'today'},// Qazplm		// false
  { id: "m", birth: '11/02'},	// Hoishin		// false
  { id: "m", birth: '11/02'},	// Harvey
  { id: "m", birth: '27/03'},	// Eden (and Flobber)
  { id: "m", birth: '29/04'},	// Roosta
  { id: "m", birth: '02/06'},	// Seth
  { id: "m", birth: '05/06'},	// Deedlit
  { id: "m",  birth: '06/07' },	// AlecK
  { id: "m", birth: '15/07' },	// Ety
  { id: "m", birth: '19/07'},	// Leo
  { id: "m", birth: '12/08'},	// Kyos
  { id: "m", birth: '24/08'},	// Qazplm		// false
  { id: "m", birth: '16/09'},	// Bébert
  { id: "m", birth: '03/10'},	// Blue
  { id: "m", birth: '15/11'},	// Coughchamp
  { id: "m", birth: '24/11'},	// zer0skar
  { id: "m", birth: '27/12'}	// Swordy
]

const botID = "b";

var t = new Table
var time = new Systime()

var j = false;

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
 * @param {Channel} channel : the channel which has been called
 * @param {data}	       d	            : an element of the data table (id + birth)
 * @return {void}
 */
function sendHappyBirthday(channel, d)
{
	var u = bot.users.get(d.id);
	let wish = `Happy birthday ${u} ! Don\'t stay alone, go share your birthday party with soloman ${emoji}`;
	if(d.birth === "today")
		wish = randomWish(u);
	channel.send(wish);
}

/**
 * -----> checkToday
 * Sends a message that says whose birthday it is today
 * @param {Channel} channel : the channel which has been called
 * @param {boolean} daily       : says if the function has been called everyday or not
 * @return {void}
 */
function checkToday(channel, daily)
{
	var snif = true;
	for(let d of data) {
		var aBirthday = toDate(d.birth);
		if(isToday(aBirthday))
		{
			snif = false;
			sendHappyBirthday(channel, d)
		}
	}
	if(snif && !daily)
	{
		var bad = welcomeChannel.guild.emojis.find('name', 'FeelsBadMan');
		channel.send(`It\'s no one\'s birthday today ${bad}`);
	}
}

/**
 * -----> replySender
 * Answers the sender of a message with their birthday date
 * @param {String} userId : The user ID of the sender
 * @return {String}                  The future birthday of the sender with a comment
 */
function replySender(userId)
{
	const comment =
	[`You\'re on fire! ${emoji}`,
	`EHEHE ${emoji}`,
	`We\'re looking forward to that! ${emoji}`,
	`The same day as soloman ${emoji}`,
	`Will you give us a PB to celebrate? ${emoji}`
	];
	for(let d of data)
	{
		if(d.id === userId)
		{
			var bday = toDate(d.birth);
			var u = bot.users.get(userId);
			var year = (isFuture(bday))?new Date().getFullYear():new Date().getFullYear() + 1;   // sets the birthday in the future, either this year or the next
			bday.setFullYear(year);
			return `Dear ${u}, your birthday will be on ${getDay(bday)}, ${getMonth(bday)} ${bday.getDate()} ${year}. ${comment[Math.floor(Math.random() * comment.length)]}`;
		}
	}
}

/**
 * -----> randomPastWish
 * Returns a comment for someone who has had a past birthday
 * @return {String} 				 : comment to send to the channel
 */
function randomPastWish()
{
	const wishes = [
	 `I hope your birthday cake was bigger than soloman's ${emoji}`,
	`I remember that time in Dalmasca with Penelo drinking. It was awesome! ${emoji}`,
	`Do you remember when we celebrated in Rozarria? No? Well, neither do I ${emoji}`,
	`I loved it when Theme of the Empire was played when they entered ${emoji}`,
	`Oh right! It was when I asked you to bring a Giza rabbit and you brought Fran ${emoji}`
	];
	return wishes[Math.floor(Math.random() * wishes.length)]
}

/**
 * -----> randomFutureWish
 * Returns a comment for someone who has a future birthday
 * @return {String} 				 : comment to send to the channel
 */
function randomFutureWish()
{
	const wishes = [
	 `I\'ll call soloman at once to prepare a celebratory swimming pool dance! Make sure you don\'t have Vaan\'s abs ${emoji}`,
	`Can I join in the party? I'll bring cookies ${emoji}`,
	`What did you plan? If you're out of ideas, ask soloman ${emoji}`,
	`That's not in a long time! Come on guys, which gifts should we get him? ${emoji}`,
	`I can feel a weeb party coming! Enjoy the show ${emoji}`
	];
	return wishes[Math.floor(Math.random() * wishes.length)]
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
 * -----> frFeel
 * Returns a French feeling!
 * @param {void} 
 * @return {String} 				 : a very special French surprise
 */
function frFeel()
{
	const feel = [
	`croissant ${emoji} \n http://www.marmiton.org/recettes/recette_croissants-au-beurre_16097.aspx`,
	`baguette ${emoji} \n http://www.marmiton.org/recettes/recette_baguette-maison_48781.aspx`,
	`choucroute ${emoji} \n http://www.marmiton.org/recettes/recette_choucroute_20312.aspx`,
	`tropézienne ${emoji} \n http://www.marmiton.org/recettes/recette_tarte-tropezienne-a-la-fleur-d-oranger_92700.aspx`,
	`quiche ${emoji} \n http://www.marmiton.org/recettes/recette_quiche-provencale_13393.aspx`,
	`pot-au-feu ${emoji} \n http://www.marmiton.org/recettes/recette_pot-au-feu-a-l-autocuiseur_20533.aspx`,
	`Bourguignon beef ${emoji} \n http://www.marmiton.org/recettes/recette_boeuf-bourguignon-simple_13320.aspx`,
	`moules frites ${emoji} \n http://www.marmiton.org/recettes/recette_moule-frites-biere-veritable-recette-ch-ti_69535.aspx`
	];
	return feel[Math.floor(Math.random() * feel.length)]
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
				return `Last birthday : ${u} (${getDay(pBirthday)}, ${getMonth(pBirthday)} ${pBirthday.getDate()} ${yearHead.getFullYear()}). ${randomPastWish()}`;
			else
				return `Next birthday : ${v} (${getDay(nBirthday)}, ${getMonth(nBirthday)} ${nBirthday.getDate()} ${yearHead.getFullYear()}). ${randomFutureWish()}`;
		}
	}
}

/**
 * -----> answerTruth
 * Replies with the true genuine answer!
 * @param {void}
 * @return {String} 				 : message to send to the channel
 */
function answerTruth()
{
	const truths = [
	`Well,  I don't know. Maybe. Who knows? ${emoji}`,
	`Absolutely. Couldn't have said it any better! ${emoji}`,
	`Not at all. That's highly unlikely ${emoji}`,
	`I have to ask soloman but it seems exactly the case ${emoji}`,
	`Probably not. Try again ${emoji}`,
	`... As sure as zer0 can keep an Any% WR for more than 24 hours ${emoji}`,
	`If this is true, then hoishin has stopped being a weeb ${emoji}`,
	`Of course! Roosta can confirm it from the top of his bike! ${emoji}`,
	`The answer is written deep inside Kyö's inner tattoos ${emoji}`,
	`Yes, that's right! Seth and Qaz even made emotes about it ${emoji}`,
	`Hum... That will happen the day Harvey will not be underage anymore ${emoji}`
	]
	return truths[Math.floor(Math.random() * truths.length)];
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
	let index = Math.floor(Math.random() * needs.length);
	let word = needs[index];
	if(word === "a joke")
		j = true;  	// joke mode activated
	return `Always here for your birthday needs. Would you like ${word}? ${emoji}`;
}

/**
 * -----> sendJoke
 * Sends a joke to the channel of the request message
 * @param {Message}	 msg	 : the message to check
 * @resolve {sJoke}					 : the joke content
 */
function sendJoke(msg)
{
	try
	{
		var call = new Promise( (resolve, reject) =>
		{
			resolve(sJoke());
		});
	}
	catch(err)
	{
		console.log("Error while joking: " + err);
	}
	call.then( (res) => {
		msg.channel.send(`Here is your joke: ${res}`);
	})
		.catch( (err) => {
		console.log("Error sending the joke: " + err);
	});
}

/**
 * -----> checkChannels
 * Checks if the message has been sent either in #random_talk or #test
 * @param {Message}	 msg	 : the message to check
 * @return {boolean} 				 : if the message has been sent in the approved channels
 */
function checkChannels(msg)
{
	j = false;
	return (msg.channel === welcomeChannel) || (msg.channel == testChannel);
}


/** -------------------- TIME EVENTS ----------------------- */
// Timer strats
/* time.on('second', () => {
	var u = bot.users.get("118150122893737991");
	welcomeChannel.send(randomWish(u));
})*/

// Daily notice
time.on('day', () =>
	checkToday(welcomeChannel, true)
)


/** -------------------- DISCORD EVENTS ----------------------- */
 // Gets called when our bot is successfully logged in and connected
bot.on('ready', () => {
	welcomeChannel = bot.channels.get(random_talk);
	testChannel = bot.channels.get(testing);
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
		if (msg.content.indexOf("ping") === 0 && checkChannels(msg)) {
		// send a message to the channel the ping message was sent in.
		msg.channel.send("pong!");
		// alert the console
		console.log("pong-ed " + msg.author.username);
		}
		// ask for last birthday
		if (msg.content === "!birthday" && checkChannels(msg)) {
			msg.channel.send(getBirthday(false)) ;
		}
		// ask for next birthday
		if (msg.content === "!next" && checkChannels(msg)) {
			msg.channel.send(getBirthday(true)) ;
		}
		// date reminder
		if ( msg.content.startsWith("!date") && checkChannels(msg)) {
			var today = new Date();
			msg.channel.send(`I never liked you but soloman told me to make an exception so here is the date: ${today} ${emoji}`);
		}
		// ask for today's birthdays
		if (msg.content === "!today" && checkChannels(msg)) {
			checkToday(msg.channel, false)
		}
		// ask for sender's birthday
		if (msg.content === "!mine" && checkChannels(msg)) {
			//msg.channel.send(`Are you seriously asking for your own birthday? Pls ${msg.author.username}.`)
			msg.channel.send(replySender(msg.author.id))
		}
		// send a joke
		if (msg.content === "!joke" && checkChannels(msg)) {
			sendJoke(msg);
		}
		// send a joke after a summon
		if (j) {
			if(msg.content.toLowerCase().startsWith("yes") && checkChannels(msg)) {
				sendJoke(msg);
			}
		}
		// ask Bbot about anything!
		if (msg.content.toLowerCase().startsWith("bbot") && checkChannels(msg)) {
			msg.channel.send(answerTruth())
		}
		// ask Bbot about a French surprise
		if (msg.content.toLowerCase().startsWith("abot") && checkChannels(msg)) {
			msg.channel.send(frFeel())
		}
		// answer to mention
		if(msg.isMentioned(bot.users.get(botID)))
			msg.channel.send(atMention());
});

// When a new member joins the server
bot.on('guildMemberAdd',  member => {
		let g = member.guild;
		let w = g.owner.user.username;
		let u = member.user.username;
		console.log('New joiner in the party - ' + u);
		welcomeChannel.send(`Welcome ${u} ! To be fully part of the adventure, don\'t forget to message ${w} with your birthday date ${emoji}`);
});
 
 
/** -------------------- LET'S GOOOOOOOOO ----------------------- */
 bot.login(token);
 
 
 // link for this bot to join the server: https://discordapp.com/oauth2/authorize?client_id=308973156578885632&scope=bot
 
 /* ---------------------------------------------------------------- *
*  End of life... I mean End of file FeelsBirthdayMan
 * ----------------------------------------------------------------- */

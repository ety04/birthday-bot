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
   
 // Because we don't want relics to die
require('newrelic');
 
// Import the discord.js module
const Discord = require('discord.js')

// Import the birthday table
const Table = require('easy-table')

// Import the systime module
const Systime = require('systime')

// Import the funniest module
const sJoke = require('./scripts/scrape_joke')
const fJoke = require('./scripts/scrape_joke_with_fml')

// import an interesting module
const translator = require('google-translate-api')

/** -------------------- GLOBAL VARIABLES ----------------------- */

// Create an instance of Discord that we will use to control the bot
const bot = new Discord.Client();

// Token for the bot, located in the Discord application console - https://discordapp.com/developers/applications/me/
const token = process.env.TK_BD_BOT;

// channel used
var welcomeChannel, testChannel, botChannel;
const testing = process.env.TST_CN;
const random_talk = process.env.RDM_CN;
const birthday_bot_cn = process.env.BBT_CN;

// very important emoji
var emoji;

// Birthday data
const data = [
  //{ id: "m", birth: 'today'},// Qazplm		// false
  { id: process.env.MB_20 , birth: '25/01'},	// Steven
  { id: process.env.MB_1 , birth: '11/02'},	// Hoishin		// false
  { id: process.env.MB_2 , birth: '11/02'},	// Harvey
  { id: process.env.MB_3 , birth: '27/03'},	// Eden (and Flobber)
  { id: process.env.MB_21, birth: '20/04'},	// Cid
  { id: process.env.MB_4 , birth: '29/04'},	// Roosta
  { id: process.env.MB_5 , birth: '02/06'},	// Seth
  { id: process.env.MB_6 , birth: '05/06'},	// Deedlit
  { id: process.env.MB_7 , birth: '11/06'},	// Suga
  { id: process.env.MB_8 , birth: '15/06'},	// Vinny
  { id: process.env.MB_9 ,  birth: '06/07' },	// AlecK
  { id: process.env.MB_10, birth: '15/07' },	// Ety
  { id: process.env.MB_12, birth: '12/08'},	// Kyos
  { id: process.env.MB_13, birth: '24/08'},	// Qazplm		// false
  { id: process.env.MB_15, birth: '03/10'},	// Blue
  { id: process.env.MB_19, birth: '21/10'},	// Nap
  { id: process.env.MB_16, birth: '15/11'},	// Coughchamp
  { id: process.env.MB_17, birth: '24/11'}	// zer0skar
]

const botID = process.env.ID_BD_BOT;

var t = new Table
var time = new Systime()

var j = false;
var c = false;
var s = false;
var d = false;
var k = false;

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
	/*
	if(d.getFullYear() < today.getFullYear())
		return true;
	else if(d.getFullYear() === today.getFullYear() && d.getMonth() < today.getMonth())
		return true;
	else if(d.getFullYear() === today.getFullYear() && d.getMonth() === today.getMonth() && d.getDate() < today.getDate())
		return true;
	else
		return false;
	*/
	return d < today;
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
	/*
	if(d.getFullYear() > today.getFullYear())
		return true;
	else if(d.getFullYear() === today.getFullYear() && d.getMonth() > today.getMonth())
		return true;
	else if(d.getFullYear() === today.getFullYear() && d.getMonth() === today.getMonth() && d.getDate() > today.getDate())
		return true;
	else
		return false;
	*/
	return d > today;
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
 * @param {boolean} daily : says if the function has been called everyday or not
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
		var bad = welcomeChannel.guild.emojis.find(em => em.name === 'FeelsBadMan');
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
 * -----> sendDecoration
 * Returns a decoration
 * @param {void} 
 * @return {String} 				 : a one-of-a-kind decoration
 */
function sendDecoration()
{
	const dec = [
	`You found an Australian Christmas tree ! ${emoji} \n https://www.bhg.com.au/cdnstorage/cache/b/3/8/a/e/1/xb38ae1ae465c674caa5fbbd8567448de4f278512.jpg.pagespeed.ic.0ytuMtOdF6.jpg`,
	`You found a Scandinavian wallpaper ${emoji} \n https://www.izoa.fr/11271-large_default/papier-peint-scandinave-air-de-rien.jpg`,
	`You found a garden party ! My favorite ${emoji} \n http://www.jolibapteme.com/wp-content/uploads/2016/10/garden-party-bapteme1.jpg`,
	`You found a beach speech ! Let's listen to Tomaj ${emoji} \n http://online-fakturi.com/wp-content/uploads/2018/04/cool-beach-wedding-decorations-for-sale-40-in-table-ideas-with-cute-decoration-6.jpg`,
	`You found a Moroccan wedding! Why is Ety hiding ? ${emoji} \n http://www.moroccanpartyrental.com/images/flash5.jpg`,
	`You found a Japanese room ! Good job Hoishin ${emoji} \n http://web-senryaku.info/wp-content/uploads/2018/05/japanese-decorations-hanging-images-of-yokohama-japan-decorations-like-china-fans-and-lanterns-are-of-japanese-decorations-hanging.jpeg`,
	`You found a Bollywood scenery ${emoji} \n http://www.parties2weddings.com.au/wp-content/uploads/2016/10/mandapdecore-e1476874534997.jpg`,
	`You found... a little hut ${emoji} \n https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSck0VgKU-eIhsPBQp8bzzDLkWFgdavfAFeh3xqFhcFp7I8KpLGPQ`
	];
	return dec[Math.floor(Math.random() * dec.length)]
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
			if(d == data[data.length -1])	// reached last element, and it is past!
			{
				d = data[0];	// first birthday of the new year
				nBirthday = toDate(d.birth);
				u = bot.users.get(d.id);
				return `Next birthday : ${u} (${getDay(nBirthday)}, ${getMonth(nBirthday)} ${nBirthday.getDate()} ${yearHead.getFullYear() +1}). ${randomFutureWish()}`;
			}
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
	`... As sure as zer0 can now keep an Any% WR for more than 24 hours ${emoji}`,
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
	if(word === "a ceremony")
		c = true;  	// ceremony mode activated
	if(word === "a surprise")
		s = true;  	// surprise mode activated
	if(word === "decorations")
		d = true;   // decorations mode activated
	if(word === "a cake")
		k = true;   // cake mode activated
	return `Always here for your birthday needs. Would you like ${word}? ${emoji}`;
}

/**
 * -----> sendJoke
 * Sends a joke to the channel of the request message
 * @param {Message}	 msg	 : the message to check
 * @param {boolean}	 anc	 : if we use FML (instead of a reddit page)
 * @resolve {sJoke}					 : the joke content
 */
function sendJoke(msg, anc)
{
	try
	{
		var call = anc?new Promise( (resolve, reject) =>
		{
			resolve(fJoke());
		}): new Promise( (resolve, reject) =>
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
 * -----> sendCeremony
 * Sends a ceremony to the channel of the request message
 * @param {Message}	 msg	 : the message to check
 * @param {Message}	 user	 : a specific user for the ceremony, or ""
 * @return {void}
 */
function sendCeremony(msg, user)
{
	var selectedUser = (user === "")?false:true;
	var mabrouk = "Let us celebrate the ";
	var un1 = "";		// ID of the first user concerned by the ceremony
	var zhar = (!selectedUser)?0.5:1;		// We give the caller of the command a fair chance, and if a user is specifically selected, even more!
	user = (selectedUser === false)?msg.author:user;
	
	un1 = selectRandomUser(zhar, user.id, "");
	var us1 = bot.users.get(un1);
	
	const feasts = [
	"birth",
	"marriage",
	 "reincarnation",
	 "graduation",
	 "new job",
	 "house-warming",
	 "coronation",
	 "victory",
	 "retirement",
	 "burial"
	];
	let index1 = Math.floor(Math.random() * feasts.length);
	let word = feasts[index1];
	mabrouk2 = word + " of " + us1.username; 
	mabrouk += mabrouk2;
	if(word == "marriage")
	{
		if(selectedUser === true)
			zhar = 0; // the first user has automatically been chosen as the parameter, so let's change
		var un2 = selectRandomUser(zhar, user.id, un1);
		var us2 = bot.users.get(un2);
		mabrouk += " and " + us2.username + ". Yipee!"
	}
	
		msg.channel.send(mabrouk + `${emoji}`);
}

/**
 * -----> sendCake
 * Sends a cake to the channel of the request message
 * @param {Message}	 msg	 : the message to check
 * @return {String}					 : a message containing a cake!
 */
function sendCake()
{
	const cakes = [
		`Tarte Tatin! (Tatin Pie) ${emoji} \n https://cdn.theculturetrip.com/wp-content/uploads/2016/06/1024px-tarte-tatin_-wmt_-1024x855.jpg`,
		`Crème brûlée! (burnt cream) ${emoji} \n https://cdn.theculturetrip.com/wp-content/uploads/2016/06/4860111256_54df258833_b-1024x686.jpg`,
		`Chocolate Mousse! ${emoji} \n https://img.theculturetrip.com/768x432/smart//wp-content/uploads/2016/06/mousse-au-cocolat.jpg`,
		`Mille-feuilles! (Thousand papers) ${emoji} \n https://img.theculturetrip.com/768x//wp-content/uploads/2016/06/1024px-mille-feuille_20100916.jpg`,
		`Cherry Clafoutis! ${emoji} \n https://img.buzzfeed.com/buzzfeed-static/static/2015-08/4/16/enhanced/webdr05/original-21536-1438721287-3.jpg`,
		`Ispahan! ${emoji} \n https://img.buzzfeed.com/buzzfeed-static/static/2015-08/5/14/enhanced/webdr01/original-22172-1438799026-3.jpg`,
		`Straw-buh-buh-buh-buh-berry Shortcake! ${emoji} \n https://confituredelice.com/wp-content/uploads/2017/05/recette-charlotte-aux-fraises.jpg`,
		`The easiest one: Yoghurt Cake! ${emoji} \n https://www.iterroir.fr/images/photos-recettes/recette-gateau-au-yaourt-citron.jpg`,
		`Tarte au citron! (Lemon Pie) ${emoji} \n https://www.cookomix.com/wp-content/uploads/2017/02/tarte-citron-thermomix-800x600.jpg`,
		`Profiterolles! ${emoji} \n https://www.francetvinfo.fr/image/759r5hghk-14c1/580/326/10553867.jpg`,
		`Saint-Honoré! ${emoji} \n https://3.bp.blogspot.com/-gFxE4x8ZXhQ/UqOnBT8c1SI/AAAAAAAAG_8/KqIKuaxXyE4/s1600/saint-honor%C3%A9.jpg`
	];
	var selectedCake = cakes[Math.floor(Math.random() * cakes.length)];
	return `Here is... ${selectedCake}`;
}

/**
 * -----> selectRandomUser
 * Selects a random user, with the caller having a higher weight, eliminating someone or not from the results
 * @param {double}	 weight			 : the weight of the caller
 * @param {String}	 caller			 : the caller's user ID
 * @param {String}	 eliminated	 : an already selected user's ID
 * @return {String}		 ID					 : the ID of the selected user
 */
function selectRandomUser(weight, caller, eliminated)
{
	var user = "";
	var len = data.length;
	var table_zhar = [];
	
	var i=0;
	data.forEach(function(element) {
	 if(element.id === caller)
		table_zhar[i] = weight;
	else
		table_zhar[i] = (1 - weight) / (len - 1);
	i++;
	})
	
	var index = len;
	var chance = Math.random();
	var sum=0;
	for(t in table_zhar)
	{
		sum += table_zhar[t];
		if(chance <= sum)
		{
			index = t;
			break;
		}
	}
	
	i=0;
	data.forEach(function(element) {
	  if(i == index)
		user = element.id;
	i++;
	})
	
	if(user === eliminated)
		return selectRandomUser(weight, caller, eliminated)
		
	return user;
}

/**
 * -----> nameFromID
 * Get username from user's ID in the server
 * @param {String}	 id			    : the ID of the wanted user
 * @return {String}	username: the username of that user
 */
function nameFromID(id)
{
	var user = bot.users.get(id);
	return user.username;
}

/**
 * -----> sendSurprise
 * Sends a surprise with special guests
 * @param {Message}	 msg	 : the message to check
 * @param {Member}	 user	 : the user involved in the surprise, or "" to select it randomly
 * @return {void}
 */
function sendSurprise(msg, user)
{
	var selectedUser = (user === "")?false:true;
	
	let chosenUserID = (!selectedUser)?(selectRandomUser(0.5, msg.author.id, "")):(user.id);	
	let protag = nameFromID(chosenUserID);
	
	const actions = [
	"work out intensely for 3 hours",
	"go on honeymoon",
	 "dance the cucaracha",
	 "have a friendly nap",
	 "go to a restaurant",
	 "do a sprint race",
	 "take a math exam",
	 "cook a French recipe",
	 "play Overwatch",
	 "fly in an airship",
	 "go hunt Rogue Tomato",
	 "run errands for Migelo",
	 "make a Sunstone",
	 "watch Final Fantasy: The Spirits Within",
	 "make a plan to steal Pitted's glasses"
	];
	let index1 = Math.floor(Math.random() * actions.length);
	let word1 = actions[index1];
	
	const characters = [
	"Vaan",
	"Penelo",
	 "Ashe",
	 "Balthier",
	 "Basch",
	 "Fran",
	 "Montblanc",
	 "Elza",
	 "Vossler",
	 "Demon Wall 1",
	 "Gabranth",
	 "Bergan",
	 "Famfrit",
	 "Cid 2",
	 "soloman"
	];
	let index2 = Math.floor(Math.random() * characters.length);
	let word2 = characters[index2];
	
	var sentence = "Surprise of the day: " + protag + " will " + word1 + " with " + word2;
	
	msg.channel.send(sentence + `${emoji}`);
}

/**
 * -----> niHao
 * Translates a cool text into English
 * @param {Message}	 msg	 : the user's great message
 * @return {void}
 */
function niHao(msg)
{
	let line = msg.content;
	var quote = line.substr(line.indexOf(' ') + 1); // select from the first space to the end of the line
	
	translator('salut', {to: 'en'}).then( res =>
		{
			console.log(res.text);
			msg.channel.send(`Aha! That's ${res.from.language.iso}` || `No language detected`);
			msg.channel.send(`==> ${res.text}` || `No translation available`);
			
		}).catch( err => { console.log("text was: salut"); console.error(err);
		});
}

function aNiHao(msg)
{
	return new Promise( (resolve, reject) => 
	{
		resolve(niHao(msg));
	});	
}

/**
 * -----> sendNiHao
 * Uses niHao to send a translation
 * @param {Message}	 msg	 : the big message
 */
function resolveNiHao(msg)
{
	var text_content = await(aNiHao(msg));
	if(text_content === null)
		console.log("The text received is null");
	else
		console.log("The text received is NOT null");
	return text_content;
}

function sendNiHao(msg)
{
	try
	{
		var call = new Promise( (resolve, reject) =>
		{
			resolve(resolveNiHao(msg));
		});
	}
	catch(err)
	{
		console.log("Error while translating: " + err);
	}
	call.then( (res) => {
		msg.channel.send(`Aha! That's ${res.from.language.iso}` || `No translation available`);
		msg.channel.send(`==> ${res.text}` || `No translation available`);
	})
		.catch( (err) => {
		console.log("Error translating the text: " + err);
	});
}

/**
 * -----> checkChannels
 * Checks if the message has been sent either in #birthday-bot or #test
 * @param {Message}	 msg	 : the message to check
 * @return {boolean} 				 : if the message has been sent in the approved channels
 */
function checkChannels(msg)
{
	j = false;
	c = false;
	s = false;
	d = false;
	k = false;
	return (msg.channel === botChannel) || (msg.channel == testChannel);
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
	botChannel = bot.channels.get(birthday_bot_cn);
	emoji = welcomeChannel.guild.emojis.find(em => em.name === 'FeelsBirthdayMan');
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
			//sendJoke(msg, false);
			msg.channel.send(`Joke command unavailable for the moment.`);
		}
		// send a joke
		if (msg.content === "!joking" && checkChannels(msg)) {
			//sendJoke(msg, true);
			msg.channel.send(`Joking command unavailable for the moment.`);
		}
		// send a ceremony
		if (msg.content.indexOf("!ceremony") === 0 && checkChannels(msg)) {
			if (msg.content === "!ceremony")	// exactly
				sendCeremony(msg, "");
			else																// beginning with
			{
				var line = msg.content.split(' ');
				var arg1 = line.shift();
				var arg2 = line.shift();
				if(arg1 === "!ceremony" && arg2 != "")
				{
					var u = msg.mentions.members.first(); // get the user mentioned with Ceremony
					sendCeremony(msg, u);							// send them a Ceremony!
				}
			}
		}
		// send a surprise
		if (msg.content.indexOf("!surprise") === 0 && checkChannels(msg)) {
			if (msg.content === "!surprise")	// exactly
				sendSurprise(msg, "");
			else																// beginning with
			{
				var line = msg.content.split(' ');
				var arg1 = line.shift();
				var arg2 = line.shift();
				if(arg1 === "!surprise" && arg2 != "")
				{
					var u = msg.mentions.members.first(); // get the user mentioned with Surprise
					sendSurprise(msg, u);								// send them a Surprise!
				}
			}
		}
		// send a decoration
		if (msg.content.indexOf("!decoration") === 0 && checkChannels(msg)) {
			msg.channel.send(sendDecoration());
		}
		// send a cake
		if (msg.content === "!cake" && checkChannels(msg)) {
			msg.channel.send(sendCake());
		}
		// send a joke after a summon
		if (j) {
			if(msg.content.toLowerCase().startsWith("yes") && checkChannels(msg)) {
				sendJoke(msg);
			}
		}
		// send a ceremony after a summon
		if (c) {
			if(msg.content.toLowerCase().startsWith("yes") && checkChannels(msg)) {
				sendCeremony(msg, "");
			}
		}
		// send a surprise after a summon
		if (s) {
			if(msg.content.toLowerCase().startsWith("yes") && checkChannels(msg)) {
				sendSurprise(msg, "");
			}
		}
		// send a decoration after a summon
		if (d) {
			if(msg.content.toLowerCase().startsWith("yes") && checkChannels(msg)) {
				msg.channel.send(sendDecoration());
			}
		}
		// send a cake after a summon
		if (k) {
			if(msg.content.toLowerCase().startsWith("yes") && checkChannels(msg)) {
				msg.channel.send(sendCake());
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
		// ask Bbot to translate!
		if (msg.content.toLowerCase().startsWith("tbot") && checkChannels(msg)) {
			niHao(msg);
		}
		// answer to mention
		if(msg.isMentioned(bot.users.get(botID)))
			msg.channel.send(atMention());
});

// When a new member joins the server
bot.on('guildMemberAdd',  member => {
		let g = member.guild;
		let w = g.owner;
		console.log('New joiner in the party - ' + member.user.username);
		welcomeChannel.send(`Welcome ${member} ! To be fully part of the adventure, don\'t forget to message ${w} with your birthday date ${emoji}`);
});
 
 
/** -------------------- LET'S GOOOOOOOOO ----------------------- */
 bot.login(token);
 
 
 /* ---------------------------------------------------------------- *
*  End of life... I mean End of file FeelsBirthdayMan
 * ----------------------------------------------------------------- */

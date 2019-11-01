
const request = require('superagent')
var cheerio = require('cheerio')


const url = 'https://old.reddit.com/r/AskReddit/comments/5z4b1u/whats_a_short_clean_joke_that_gets_a_laugh_every';
var list_of_jokes;

/**
 * -----> aJoke
 * Makes an HTTP request to retrieve a joke from a website
 * @param {void}
 * @resolve {String} 	: a very good one
 */
function getJokes()
{
	try{
		return new Promise( (resolve, reject) => {
			request.get(url, (res, err) => {
				if(err)
				{
					console.log("ERROR REQUESTING: " + err.text);
					reject(err);
				}
				var source = cheerio.load(res.text);
				source('div.md').each( function()
				{
					var the_joke = source(this).text().trim(); // div.md-container : level 3, where the joke is
					list_of_jokes.push(the_joke);
				}); 	// end of <div class="md"> block
				resolve(list_of_jokes);
			});	// end of GET request
		});	// end of Promise			
	} // end of try		
	catch(err)
	{
		console.log("ERROR SCRAPING: " + err);
		return err;
	}
}

function aJoke()
{
	return new Promise( (resolve, reject) => 
	{
		resolve(first_call());
	});	
}

function conclusion()
{
	try
	{
		var num = list_of_jokes.length;
		console.log("number of joookes: " + num);
		let zhar = Math.floor( Math.random() * num);
		console.log("number of the joooke: " + zhar);
		let selected_joke = list_of_jokes[zhar];
		console.log("joooke: " + selected_joke);
		return selected_joke;
	}
	catch(err)
	{
		console.log("Error in conclusion: " + err);
	}
}

 function first_call()
{
	list_of_jokes = new Array();
	
	try
	{
		var outer = new Promise( (resolve, reject) =>
		{
			resolve(getJokes());
		});
	}
	catch(err)
	{
		console.log("Error while joking: " + err);
	}
	
	return outer.then( () => 
	{
		return conclusion();
	})
		.catch( (err) => {
		console.log("Error in first_call: " + err);
	});
}


/**
 * -----> retrieveJoke
 * The asynchronous call to aJoke to grab the joke's text
 * @param {void}
 * @return text_content {String}	 : a very good one
 */
async function retrieveJoke()
{
	var text_content = await aJoke();
	if(text_content === null)
		console.log("The text received is null");
	else
		console.log("The text received is NOT null");
	return text_content;
}

exports = module.exports = retrieveJoke;
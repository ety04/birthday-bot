
const request = require('superagent')
var cheerio = require('cheerio')


const url = 'fmylife.com/index.php/random';
var list_of_jokes;
var list_of_links ;

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
				source('div.panel-content').each( function()								// div : level 1
				{
					source(this).children('p').each ( function()		// p : level 2
					{
						var the_joke = source(this).children('a').first().text().trim(); // a : level 3, where the joke is
						//console.log(the_joke);
						if(the_joke.endsWith("FML"))
						{
							//console.log(the_joke);
							list_of_jokes.push(the_joke);
						}
						else if(the_joke.endsWith("..."))		// incomplete
						{
							var letsgo = "fmylife.com" + source(this).children('a').first().attr('href');
							console.log("url of the joooke: " + letsgo);
							list_of_links.push(letsgo);
						}
					});	// end of <p> block
				}); 	// end of <div> block
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

/**
 * -----> innerJoke
 * Makes an HTTP request to retrieve a joke from another web page
 * @param {String}		: the URL of the inner web page
 * @resolve {String} 	: an even better one
 */
function innerJokes(url)
{
	try{
			var inner_joke = "";
			return new Promise( (resolve, reject) =>
			{
				request.get(url, (res, err) => {
					if(err)
					{
						console.log("ERROR REQUESTING the inner web page: " + err.text);
						reject(err);
					}
					var inner_source = cheerio.load(res.text);
					inner_joke = inner_source('div.panel-content').children('p').first().text().trim();
					//console.log(inner_joke);
					 resolve(inner_joke);
				});
			});
		}catch(err)
		{
			console.log("ERROR SCRAPING the inner source file: " + err);
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
	var inner_calls = new Promise( (resolve, reject) =>
	{
		for(const l of list_of_links)
		{
			//resolve(innerJokes(l));
			resolve(innerJokes(l).then( (joke) => { list_of_jokes.push(joke); return joke; }))
		}
		//resolve(true);
	});
	
	return inner_calls.then( (bool) =>
	{
		var num = list_of_jokes.length;
		console.log("number of joookes: " + num);
		let zhar = Math.floor( Math.random() * num);
		console.log("number of the joooke: " + zhar);
		let selected_joke = list_of_jokes[zhar];
		console.log("joooke: " + selected_joke);
		return selected_joke;
	})
		.catch( (err) => {
		console.log("Error in conclusion: " + err);
	});
}

 function first_call()
{
	list_of_jokes = new Array();
	list_of_links = new Array();
	
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
	
	return outer.then( (list) => 
	{
		console.log("number of links: " + list_of_links.length);
		console.log("number of jokes until now: " + list.length);
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
const app = document.getElementById("base");


const container = document.createElement("div");
container.setAttribute('class', 'container');

app.appendChild(container);

const date = new Date();

const year = date.getFullYear();
const month = (date.getMonth() + 1); // Month goes 0-11, so need to offset by 1
const day = date.getDate();

const yearString = year.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
const monthString = month.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
const dayString = day.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});

const apiDateString = yearString + monthString + dayString;
//alert("Testing date: " + apiDateString);

const baseURL = "https://www.espn.com/mlb/schedule/_/date/"; // Don't think this will work, they populate it dynamically. Just go through official API.
//const requestURL = baseURL + apiDateString;

const requestURL = "http://statsapi.mlb.com/api/v1/schedule/games/?sportId=1"

var request = new XMLHttpRequest();
request.open('GET', requestURL, true);

request.onload = function () 
{

	// Begin accessing JSON data here
	var data = JSON.parse(this.response);
	//alert("Data: " + data);
	//alert("Data Team name: " + data.dates[0].games[0].teams.away.team.name);
	var games = data.dates[0].games;
	if (request.status >= 200 && request.status < 400) 
	{
		games.forEach(game => 
		{
			const card = document.createElement('div');
			card.setAttribute('class', 'card');
		
			const h1 = document.createElement('h1');
			h1.textContent = game.teams.away.team.name + " @ " + game.teams.home.team.name;
			

			const p = document.createElement('p');
			utcDate = game.gameDate;
			var localDate = new Date(utcDate);
			var twelveHourDateFormat = localDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
			p.textContent =  twelveHourDateFormat;

			container.appendChild(card);
			card.appendChild(h1);
			card.appendChild(p);
		});
	} 
	else 
	{
		const errorMessage = document.createElement('marquee');
		errorMessage.textContent = `Gah, it's not working!`;
		app.appendChild(errorMessage);
	}
}


// Get team colors from https://teamcolorcodes.com/mlb-color-codes/
function getHomeColor(homeTeam)
{
}
request.send();

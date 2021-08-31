/**************************************************************************************************************************/
const months = 
[
	"January", "February", "March", "April", "May", "June",
	"July", "August", "September", "October", "November", "December"
];

const table = document.getElementById("table");

const app = document.getElementById("base");
const container = document.createElement("div");
container.setAttribute('class', 'container');
app.appendChild(container);


const backButton = document.getElementById("back");
const forwardButton = document.getElementById("forward");

/*
const date = new Date();

const year = date.getFullYear();
var month = (date.getMonth() + 1); // Month goes 0-11, so need to offset by 1 for API
var day = date.getDate();*/

/**************************************************************************************************************************/

//createCalendar();
//sendRequest();

window.onload = fillPage();
window.onload = makeCalendarInteractive();

function fillPage(year = new Date().getFullYear(), month = new Date().getMonth(), day = new Date().getDate())
{
	/*alert("year: " + year);
	alert("month: " + month);
	alert("day: " + day);*/

	createCalendar(year, month, day);
	sendRequest(year, month, day);
}

/**************************************************************************************************************************/
function makeCalendarInteractive()
{
	// Dates
	for (var i = 2; i < table.rows.length; i++) 
	{	
		for (var j = 0; j < table.rows[i].cells.length; j++)
		{
			table.rows[i].cells[j].onclick = function ()
			{
				changeDate(this);
			};
		}
	}
	// Month
	backButton.onclick = function()
	{
		changeMonth(-1);
	};

	forwardButton.onclick = function()
	{
		changeMonth(1);	
	};
}



function createCalendar(year, month, day)
{
	currentMonth = document.getElementById("current-month");
	currentMonth.textContent = months[month];
	
	

	var dayMonthStartsOn = new Date(year,month,1).getDay();
	var dayCounter = 1; // Start the date out at 1


	// This will be the first row actual days
	for(var j = dayMonthStartsOn; j < 7; j++)
	{
		table.rows[2].cells[j].textContent = dayCounter;
		if(dayCounter == day)
		{
			table.rows[2].cells[j].style.backgroundColor = "LightSkyBlue";
		}
		dayCounter++;
	}

	// Can just fill the next few rows in
	for(var rowNum = 3; rowNum < 6; rowNum++)
	{
		for(var colNum = 0; colNum < 7; colNum++)
		{
			table.rows[rowNum].cells[colNum].textContent = dayCounter;	
			if(dayCounter == day)
			{
				table.rows[rowNum].cells[colNum].style.backgroundColor = "LightSkyBlue";
			}
			dayCounter++;
		}
	}

	
	
	var lastDayOfMonth = new Date(year, month,0).getDate();

	var colCounter = 0;
	for(var end = dayCounter; end < lastDayOfMonth + 1; end++)
	{
		table.rows[6].cells[colCounter].textContent = dayCounter;
		if(dayCounter == day)
		{
			table.rows[6].cells[colCounter].style.backgroundColor = "LightSkyBlue";
		}
		colCounter++;
		dayCounter++;	
	}
}

function resetHighlights()
{
	for (var i = 2; i < table.rows.length; i++) 
	{	
		for (var j = 0; j < table.rows[i].cells.length; j++)
		{
			table.rows[i].cells[j].style.backgroundColor = "";
		}
	}
}

function changeMonth(chosenMonth) 
{
	if(chosenMonth > 0)
	{    
		alert("Going forward");
		//month = chosenMonth.innerHTML;
	}
	else if(chosenMonth < 0)
	{
		alert("Going back");
	}
	else
	{
		alert("Error");
	}
}

function changeDate(chosenDate) 
{
	if(chosenDate.innerHTML != "")
	{    
		alert(chosenDate.innerHTML);
		resetHighlights();
		//day = chosenDate;
	}
	else
	{
		alert("Pick an actual date.");
	}
}



function sendRequest(year, month, day) 
{
	//http://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&startDate=2021-08-31&endDate=2021-08-31
	//const requestURL = "http://statsapi.mlb.com/api/v1/schedule/games/?sportId=1"
	var baseURL = "http://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&startDate="
	var dateURL = year + "-" + (month + 1) + "-" + day; // Need to add 1 to month, since JS months go from 0-11
	var requestURL = baseURL + dateURL + "&endDate=" + dateURL;

	//alert("Request:     " + requestURL);
	var request = new XMLHttpRequest();
	request.onload = loadHandler;
	request.open('GET', requestURL, true);
	request.send();
}

function loadHandler()
{
	// Begin accessing JSON data here
	var data = JSON.parse(this.response);
	
	var games = data.dates[0].games;
	if (this.status >= 200 && this.status < 400) 
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
		errorMessage.textContent = "Request error.";
		app.appendChild(errorMessage);
	}
}
/*
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



request.send();
*/

// Get team colors from https://teamcolorcodes.com/mlb-color-codes/
function getHomeColor(homeTeam)
{
}




/**************************************************************************************************************************/
const months = 
[
	"January", "February", "March", "April", "May", "June",
	"July", "August", "September", "October", "November", "December"
];

const table = document.getElementById("table");

const app = document.getElementById("base");


var currentMonth = document.getElementById("current-month");
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
	//alert("fillPage Date: " + year + month + day);
	//alert("year: " + year);
	//alert("month: " + month);
	//alert("day: " + day);

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
		changeMonth("prev");
	};

	forwardButton.onclick = function()
	{
		changeMonth("next");	
	};
}



/**************************************************************************************************************************/
function createCalendar(year, month, day)
{
	//alert("createCalendar Date: " + year + month + day);
	currentMonth.textContent = months[month];
	
	
	
	var dayMonthStartsOn = new Date(year,month,1).getDay();
	//alert("Day month starts on: " + dayMonthStartsOn);
	var lastDayOfMonth = new Date(year, (month + 1),0).getDate();
	var dayCounter = 1; // Start the date out at 1
	//var monthNeedsSeventhRow; = (lastDayOfMonth - dayMonthStartsOn) < 28; // There will be a 7th row
	var maxRows;
	
	// No baseball in February, don't have to worry about that.
	if((lastDayOfMonth > 30) && ((lastDayOfMonth - dayMonthStartsOn) < 28))
	{
		maxRows = 8;
	}
	else if((lastDayOfMonth == 30) && ((lastDayOfMonth - dayMonthStartsOn) < 27))
	{
		maxRows = 8;
	}
	else
	{
		maxRows = 7;
	}
	
		
	
	/*if(monthNeedsSeventhRow)
	{
		alert("True");
		maxRows = 8;
	}
	else
	{
		alert("False");
		maxRows = 7;
	}*/

	//alert("Month: " + month + "   there will be a seventh row: " + test);
	//if(lastDayOfMonth - dayMonthStartsOn < 28) 


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

	
	//alert("Max Rows - 1: " + (maxRows - 1));
	// Can just fill the next few rows in
	for(var rowNum = 3; rowNum < (maxRows - 1); rowNum++)
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

	
	

	//alert("dayCounter: " + dayCounter);
	//alert("lastDayOfMonth: " + lastDayOfMonth);
	//alert("lastDayOfMonth + 1: " + (lastDayOfMonth + 1));
	var colCounter = 0;
	for(var end = dayCounter; end < lastDayOfMonth + 1; end++)
	{
		//alert("Max Rows: " + maxRows);
		table.rows[(maxRows - 1)].cells[colCounter].textContent = dayCounter;
		if(dayCounter == day)
		{
			table.rows[(maxRows - 1)].cells[colCounter].style.backgroundColor = "LightSkyBlue";
		}
		colCounter++;
		dayCounter++;	
	}
}

/**************************************************************************************************************************/
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

function resetDates()
{
	for (var i = 2; i < table.rows.length; i++) 
	{	
		for (var j = 0; j < table.rows[i].cells.length; j++)
		{
			table.rows[i].cells[j].textContent = "";
		}
	}
}


function resetGames()
{
	var container = document.getElementById("container-id");
	//app.removeChild(container);
	container.remove();
}

/**************************************************************************************************************************/
function changeMonth(chosenMonth) 
{
	var newMonth;
	if(chosenMonth == "next")
	{    
		newMonth = months.indexOf(currentMonth.textContent) + 1;
		//alert("Going forward");
		//alert("Current Month: " + months.indexOf(currentMonth.textContent));
		//alert("New Month: " + newMonth);
		resetHighlights();
		resetDates();
		resetGames();
		fillPage(new Date().getFullYear(), newMonth, 1);
		//alert("Month name: " + months[newMonth]);
	}
	else if(chosenMonth == "prev")
	{
		newMonth = months.indexOf(currentMonth.textContent) - 1;
		//alert("Going back");
		//alert("Current Month: " + months.indexOf(currentMonth.textContent));
		//alert("New Month: " + newMonth);
		resetHighlights();
		resetDates();
		resetGames();
		fillPage(new Date().getFullYear(), newMonth, 1);
		//alert("Month name: " + months[newMonth]);
	}
	else
	{
		alert("Error");
	}
}

function changeDate(chosenDate) 
{
	var curMonth = months.indexOf(currentMonth.textContent);
	var newDate = chosenDate.innerHTML;
	if(newDate != "")
	{    
		//alert(newDate);
		resetHighlights();
		resetDates();
		resetGames();
		fillPage(new Date().getFullYear(), curMonth, newDate);
	}
	else
	{
		alert("Pick an actual date.");
	}
}


/**************************************************************************************************************************/
function sendRequest(year, month, day) 
{
	//alert("sendRequest Date: " + year + month + day);
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

/**************************************************************************************************************************/
function loadHandler()
{
	const container = document.createElement("div");
	container.setAttribute('class', 'container');
	container.setAttribute('id', 'container-id');
	app.appendChild(container);

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

/**************************************************************************************************************************/
// Get team colors from https://teamcolorcodes.com/mlb-color-codes/
function getHomeColor(homeTeam)
{
}




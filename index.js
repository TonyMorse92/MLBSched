

const app = document.getElementById("base");


const container = document.createElement("div");
container.setAttribute('class', 'container');

app.appendChild(container);

const date = new Date();

const year = date.getFullYear();
var month = (date.getMonth() + 1); // Month goes 0-11, so need to offset by 1 for API
var day = date.getDate();

const yearString = year.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
const monthString = month.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
const dayString = day.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});

const months = 
[
	"January", "February", "March", "April", "May", "June",
	"July", "August", "September", "October", "November", "December"
];

function createCalendar()
{
	currentMonth = document.getElementById("current-month");
	currentMonth.textContent = months[month-1];
	//alert("Month: " + month);
	/*
	//const calendar = document.getElementById("date-selection");

	// Put the month as a select
	monthSelect = document.createElement("select");
	monthSelect.value = "August";
	calendar.appendChild(monthSelect);

	// Can just be one function with an array of the days. It would look better
	table = document.createElement("table");
	table.setAttribute("id", "tbl");

	//caption = document.createElement("caption");
	//caption.textContent = "Month";
	//table.appendChild(caption);

	headerRow = document.createElement("tr");

	sunday = document.createElement("th");
	sunday.textContent = "S";
	headerRow.appendChild(sunday);

	monday = document.createElement("th");
	monday.textContent = "M";
	headerRow.appendChild(monday);

	tuesday = document.createElement("th");
	tuesday.textContent = "T";
	headerRow.appendChild(tuesday);

	wednesday = document.createElement("th");
	wednesday.textContent = "W";
	headerRow.appendChild(wednesday);

	thursday = document.createElement("th");
	thursday.textContent = "T";
	headerRow.appendChild(thursday);

	friday = document.createElement("th");
	friday.textContent = "F";
	headerRow.appendChild(friday);

	saturday = document.createElement("th");
	saturday.textContent = "S";
	headerRow.appendChild(saturday);


	table.appendChild(headerRow);

	
	dayMonthStartsOn = new Date(year,month - 1,1).getDay();
	firstRow = document.createElement("tr");

	*/

	table = document.getElementById("table");
	// First date rows
	// Make blanks until first day of month
	var dayMonthStartsOn = new Date(year,month - 1,1).getDay();
	var dayCounter = 1; // Start the date out at 1

	//var rowCounter = 2; // The first two rows are headers
	/*var colCounter = 0;
	for(var i = 0; i < dayMonthStartsOn; i++)
	{
		colCounter++;	
	}*/


	// I have the loop above. I don't think I need it, because if the
	// day starts on say Monday, then dayMonthStartOn will be 1, so I just use that.
	//alert("Day month starts on: " + dayMonthStartsOn);

	// This will be the first row actual days
	for(var j = dayMonthStartsOn; j < 7; j++)
	{
		//alert("j: " + j);
		table.rows[2].cells[j].textContent = dayCounter;
		//numDay.textContent = dayCounter;
		dayCounter++;
	}

	//table.appendChild(firstRow);
	

	// Can just fill the next few rows in
	for(var rowNum = 3; rowNum < 6; rowNum++)
	{
		//var newRow = document.createElement("tr");
		for(var colNum = 0; colNum < 7; colNum++)
		{
			table.rows[rowNum].cells[colNum].textContent = dayCounter;
			//numDay = document.createElement("td");
			//numDay.textContent = dayCounter;
			//newRow.appendChild(numDay);
			dayCounter++;
		}
		//table.appendChild(newRow);
	}

	
	
	var lastDayOfMonth = new Date(year, month,0).getDate();
	//var lastRow = document.createElement("tr");
	// Last row go until we are at the last day,
	// Then just add blanks
	//alert("Last day of month: " + lastDayOfMonth);
	var colCounter = 0;
	for(var end = dayCounter; end < lastDayOfMonth + 1; end++)
	{
		table.rows[6].cells[colCounter].textContent = dayCounter;
		//numDay = document.createElement("td");
		//numDay.textContent = dayCounter;
		//lastRow.appendChild(numDay);
		colCounter++;
		dayCounter++;	
	}

	
	// I don't need to do this anymore, because they are blank by default
	// Last blanks
	// Putting 35 initially, I think it should be 36
	/*for(var last = lastDayOfMonth; last < 35; last++)
	{
		blankDay = document.createElement("td");
		blankDay.textContent = "";
		lastRow.appendChild(blankDay);	
	}
	
	table.appendChild(lastRow);*/


	// Default to the first of the current month
	//alert("First day of month: " + new Date(year,month - 1,1).getDay());
	//alert("Last numbered day of month: " + new Date(year, month,0).getDate());

	//calendar.appendChild(table);

	

	// Checking table size to see if I can just loop through like normal
	//alert("Number rows: " + table.rows.length);
	//alert("Number cols: " + table.rows[0].cells.length);

	// Start at 2 because first two rows are headers
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
	
	
	backButton = document.getElementById("back");
	forwardButton = document.getElementById("forward");

	backButton.onclick = function()
	{
		changeMonth(-1);
	}

	//caption.onclick = function() 
	//currentMonth.onclick = function()
	forwardButton.onclick = function()
	{
		changeMonth(1);	
	};
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
		day = chosenDate;
	}
	else
	{
		alert("Pick an actual date.");
	}
}


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

createCalendar();

request.send();

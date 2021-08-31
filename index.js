

const app = document.getElementById("base");


const container = document.createElement("div");
container.setAttribute('class', 'container');

app.appendChild(container);

const date = new Date();

const year = date.getFullYear();
const month = (date.getMonth() + 1); // Month goes 0-11, so need to offset by 1 for API
const day = date.getDate();

const yearString = year.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
const monthString = month.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
const dayString = day.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});

function createCalendar()
{
	const calendar = document.getElementById("calendar");

	// Can just be one function with an array of the days. It would look better
	table = document.createElement("table");
	table.setAttribute("id", "tbl");

	caption = document.createElement("caption");
	caption.textContent = "Month";
	table.appendChild(caption);

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

	
	// First date rows
	// Make blanks until first day of month
	var dayCounter = 1; // Start the date out at 1
	for(var i = 1; i < dayMonthStartsOn; i++)
	{
		blankDay = document.createElement("td");
		blankDay.textContent = "";
		firstRow.appendChild(blankDay);	
	}

	// This will be the first row actual days
	for(var j = dayMonthStartsOn; j < 7; j++)
	{
		numDay = document.createElement("td");
		numDay.textContent = dayCounter;
		firstRow.appendChild(numDay);
		dayCounter++;
	}

	table.appendChild(firstRow);
	

	// Can just fill the next few rows in
	for(var rows = 2; rows < 5; rows++)
	{
		var newRow = document.createElement("tr");
		for(var col = 0; col < 7; col++)
		{
			numDay = document.createElement("td");
			numDay.textContent = dayCounter;
			newRow.appendChild(numDay);
			dayCounter++;
		}
		table.appendChild(newRow);
	}

	
	
	var lastDayOfMonth = new Date(year, month,0).getDate();
	var lastRow = document.createElement("tr");
	// Last row go until we are at the last day,
	// Then just add blanks
	for(var end = dayCounter; end < lastDayOfMonth + 1; end++)
	{
		numDay = document.createElement("td");
		numDay.textContent = dayCounter;
		lastRow.appendChild(numDay);
		dayCounter++;	
	}

	
	
	// Last blanks
	// Putting 35 initially, I think it should be 36
	for(var last = lastDayOfMonth; last < 35; last++)
	{
		blankDay = document.createElement("td");
		blankDay.textContent = "";
		lastRow.appendChild(blankDay);	
	}
	
	table.appendChild(lastRow);


	// Default to the first of the current month
	//alert("First day of month: " + new Date(year,month - 1,1).getDay());
	//alert("Last numbered day of month: " + new Date(year, month,0).getDate());

	calendar.appendChild(table);

	

	// Checking table size to see if I can just loop through like normal
	//alert("Number rows: " + table.rows.length);
	//alert("Number cols: " + table.rows[0].cells.length);

	// Start at 1 because first row is the days of the week
    for (var i = 1; i < table.rows.length; i++) {
        for (var j = 0; j < table.rows[i].cells.length; j++)
        table.rows[i].cells[j].onclick = function () {
            tableText(this);
        };
    
	}

	caption.onclick = function() {
	tableText(this);	};

}


function tableText(tableCell) {
	if(tableCell.innerHTML != "")    
	alert(tableCell.innerHTML);
	else
	alert("Pick an actual date.");
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

// Declare GameBoard
var game = new gameboard(countries,map,players,colors);

var dev_speed

// functions for running a turn
// ideally called about once per sec
function update(){
	//update country progress
	updateProgress(game);
	
	//update bank
	updateBanks(game);
	
	//update markers
	updateMarkers(game);
	
	//player1.bank = player1.bank + 1;
	setConstUI(game.players[0]);
}

function updateProgress(gb){
	for(i = 0; i < gb.countries.length; i++){
		var c = gb.countries[i];
		if(c.owner == "neutral"){continue;}
		//increment the payprog
		c.payProg++;

		if((c.dev + c.fort) < c.maxVal){
			//increment the upprog
			c.upProg++;
			
			//check if there is a level up
			if(c.upProg > c.dev * 10 * step){
				c.upProg = 0;
				c.dev++;
			}
		}
		
	}
}

function updateBanks(gb){
	//go through all the countries, and add the dev to the bank of that player
	for(i = 0; i < gb.players.length; i++){
		var p = gb.players[i];
		for(j = 0; j < gb.countries.length; j++){
			if(gb.countries[j].owner == p.name){
				if(gb.countries[j].payProg > p.payMax){
					p.bank += gb.countries[j].dev;
					gb.countries[j].payProg = 0;
				}
			}
		}
	}
}

function initmarkers(gb){
	for(i = 0; i < gb.countries.length; i++){
		var c = gb.countries[i];
		var str = "#" + c.name;
		var v = $(str).children(".val").get(0);
		var p = $(str).children(".payBar").get(0);
		var u = $(str).children(".upBar").get(0);
		var m = document.getElementById(gb.countries[i].name);
		var mker = new marker(m,v,p,u);
		c.marker = mker;
	}
}


function updateMarkers(gb){
	for(i = 0; i < gb.countries.length; i++){
		var c = gb.countries[i];
		c.marker.m.style.backgroundColor = gb.colors[c.owner];
		
		//main view (prog bars + dev/fort)
		if(current_context == "home"){
		c.marker.v.innerHTML = c.dev + "/" + c.fort;
		c.marker.p.style.width = (c.payProg / (5 * step)) * 100 + "%";
		c.marker.u.style.width = (c.upProg / (c.dev * (10 * step))) * 100 + "%";
		}
		//dev view (prog bars + dev/max-fort)
		if(current_context == "dev"){
			c.marker.v.innerHTML = c.dev + "/" + (c.maxVal - c.fort);
			c.marker.p.style.width = (c.payProg / (5 * step)) * 100 + "%";
			c.marker.u.style.width = (c.upProg / (c.dev * (10 * step))) * 100 + "%";
		}
		//mil view (fort/max)
		if(current_context == "mil"){
			c.marker.v.innerHTML = c.fort + "/" + (c.maxVal - c.dev);
			c.marker.p.style.width = "0%";
			c.marker.u.style.width = "0%";
		}
		//res view (dev)
		if(current_context == "res"){
			c.marker.v.innerHTML = c.dev;
			c.marker.p.style.width = "0%";
			c.marker.u.style.width = "0%";
		}
	}
}

function clickHandler(id){
	//set the clicked country to be yours
	for(j = 0; j < game.countries.length; j++){
		if(game.countries[j].name == id){
			game.countries[j].owner = "user";
		}
	}
}
//STUB

// Country ----
function country(name, maxVal, dev, fort){
	this.name = name;
	this.maxVal = maxVal;
	this.dev = dev;
	this.fort = fort;
	this.marker = null;
	this.isHabitable = true;
}

// Countries --
var countries = [];

var britain = new country("Britain",15,4,1);
countries.push(britain);

// Map --------
//  A graph detailing country connections
var map = [];

// Players

function player(name, bank, research){
	this.name = name;
	this.bank = bank;
	this.research = research;
}

var players = [];
player1 = new player("player1", 100,0);
players.push(player1);


//GameBoard --
function gameboard(countries, map, players){
	this.countries = countries;
	this.map = map;
	this.players = players;
}

var game = new gameboard(countries,map,players);
//STUB

// GameBoard --
function gameboard(countries, map, players, markers){
	this.countries = countries;
	this.map = map;
	this.players = players;
}

// Country ----
function country(name, x, y, maxVal, dev, fort){
	this.name = name;
	this.x = x;
	this.y = y;
	this.maxVal = maxVal;
	this.dev = dev;
	this.fort = fort;
	this.isHabitable = true;
}

// Countries --
var countries = [];

var britain = new country("Britain",15,4,1,true);
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

player1 = new player("player1", 100,0);

var players = [];
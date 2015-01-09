// Country
//  contains details about each Country
function country(name, maxVal, dev, fort){
	this.name = name;
	this.maxVal = maxVal;
	this.dev = dev;
	this.fort = fort;
	this.marker = null;
	this.isHabitable = true;
}

// Player
//  contains details about each Player
function player(name, bank, research){
	this.name = name;
	this.bank = bank;
	this.research = research;
}

// Edge
//  connects two countries on the map
function edge(c1, c2, type, dist){
	this.c1 = c1;
	this.c2 = c2;
	this.type = type;
	this.dist = dist;
}

// GameBoard
// contains the information about the entire GameBoard
function gameboard(countries, map, players){
	this.countries = countries;
	this.map = map;
	this.players = players;
}
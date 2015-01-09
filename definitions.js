var tstep = 10;
var tick = 500;
var step = tick / tstep;

// Country
//  contains details about each Country
function country(name, maxVal, dev, fort){
	this.name = name;
	this.maxVal = maxVal;
	this.dev = dev;
	this.fort = fort;
	this.owner = "neutral";
	this.payProg = 0;
	this.upProg = 0;
	this.marker = null;
	this.isHabitable = true;
}

//stores the marker information
function marker(m,v,p,u){
	this.m = m;
	this.v = v;
	this.p = p;
	this.u = u;
}

// Player
//  contains details about each Player
function player(name, color, bank, research){
	this.name = name;
	this.color = color;
	this.bank = bank;
	this.research = research;
	this.payMax = 5 * step;
	this.upRate = 10 * step;
}

function player(name, color){
	this.name = name;
	this.color = color;
	this.bank = 0;
	this.research = 0;
	this.payMax = 5 * step;
	this.upRate = 10 * step;
}

// Edge
//  connects two countries on the map
function edge(c1, c2, land, water, air){
	this.c1 = c1;
	this.c2 = c2;
	this.land = land;
	this.water = water;
	this.air = air;
}

// GameBoard
// contains the information about the entire GameBoard
function gameboard(countries, map, players, colors){
	this.countries = countries;
	this.map = map;
	this.players = players;
	this.colors = colors;
}
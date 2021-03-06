var tstep = 10;
var tick = 500;
var step = tick / tstep;

var defaultCPayTicks = 5 * step; //5 ticks to payout
var defaultCUpMult = 10 * step; //10 ticks * dev level to upgrade

var defaultAttackSpeed = [];
defaultAttackSpeed["land"] = 15 * step; //15 ticks per attack
defaultAttackSpeed["water"] = 20 * step;
defaultAttackSpeed["air"] = 10 * step;
var defaultAttackCost = [];
defaultAttackCost["land"] = 2 / step; //costs 2 dollars per tick
defaultAttackCost["water"] = 3 / step;
defaultAttackCost["air"] = 1 / step;

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
	this.payMult = 1;
	this.upMult = 1;
}

function player(name, color){
	this.name = name;
	this.color = color;
	this.bank = 0;
	this.research = 0;
	//country multipliers
	this.payMult = 1;
	this.upMult = 1;
	this.maxMult = 1;
	//attack multipliers
	this.costMult = [];
	this.costMult["land"] = 1;
	this.costMult["water"] = 1;
	this.costMult["air"] = 1;
	this.speedMult = [];
	this.speedMult["land"] = 1;
	this.speedMult["water"] = 1;
	this.speedMult["air"] = 1;
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

function attack(c1,c2,edge,type,owner){
	console.log(c1);
	this.c1 = c1;
	this.c2 = c2;
	this.type = type;
	this.owner = owner;
	this.prog = 0;
	
	if(type == "x"){
		this.dist = [];
		this.dist["land"] = edge["land"];
		this.dist["water"] = edge["water"];
		this.dist["air"] = edge["air"];
	}
	else { this.dist = edge[type]; }
}

// GameBoard
//  contains the information about the entire GameBoard
function gameboard(countries, map, players, colors, attacks){
	this.countries = countries;
	this.map = map;
	this.players = players;
	this.colors = colors;
	this.attacks = attacks;
}
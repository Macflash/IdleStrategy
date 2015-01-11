// Declare GameBoard
var attacks = [];
var game = new gameboard(countries,map,players,colors, attacks);
var current_user = "user";

// functions for running a turn
// ideally called about once per sec
function update(){
	//update country progress
	updateProgress(game);
	
	//update bank
	updateBanks(game);
	
	//update attacks
	updateAttacks(game);
	
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
		var owner = get_player(c.owner);
		if((c.dev + c.fort) < c.maxVal * owner.maxMult){
			//increment the upprog
			c.upProg++;
			
			//check if there is a level up
			if(c.upProg > c.dev * defaultCUpMult * owner.upMult){
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
				if(gb.countries[j].payProg > defaultCPayTicks * p.payMult){
					p.bank += gb.countries[j].dev;
					gb.countries[j].payProg = 0;
				}
			}
		}
	}
}

//get player p
function get_player(p){
	for(i = 0; i < game.players.length;i++){
		if(game.players[i].name == p){
			return game.players[i];
		}
	}
}

//get country c
function get_country(c){
	for(i = 0; i < game.countries.length;i++){
		if(game.countries[i].name == c){
			return game.countries[i];
		}
	}
}

function attack_cost(a, p){
	return defaultAttackCost[a.type] * p.costMult[a.type];
}

function attack_speed(a, p){
	return defaultAttackSpeed[a.type] * p.speedMult[a.type];
}

function updateAttacks(gb){
	//go through all the attacks
	for(i = 0; i < gb.attacks.length; i++){
		var a = gb.attacks[i];
		var owner = get_player(a.owner);
		//console.log(attack_cost(a, owner));
		//check the owner owns the source country
		if(!isOwnedBy(a.c1,owner.name) || owner.bank < attack_cost(a, owner)){
			remove_attack(a.c1,a.c2);
		}
		else{
			//fund them
			owner.bank -= attack_cost(a,owner);
			//progress them
			a.prog++;
			//reduce based on them
			if(a.prog > attack_speed(a, owner)){
				a.prog = 0;
				console.log("Attacked!");
				var c1 = get_country(a.c1);
				var c2 = get_country(a.c2);
				if(c2.fort * 2 <= c1.fort){
					console.log("winner!");
					remove_attack(a.c1,a.c2);
					//attack wins! change the ownership
					//console.log(c1.owner.toString());
					//console.log(c2.owner);
					//c2.owner = c1.owner;
					//console.log(c1.owner);
					//console.log(c2.owner);
				}
				else{
					console.log("reduced!");
					c2.fort--;
					c2.dev--;
				}
			}
		}
	}
	if(current_context == "mil" || current_context == "home"){
		//clear canvas and redraw
		display_attacks(game);
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

function draw_arrow(sx,sy,ex,ey,color,width){
	var dx,dy;
	var l = Math.sqrt(Math.pow(ex - sx,2) + Math.pow(ey - sy,2));
	dx = ex - sx;
	dy = ey - sy;
	
	ex = sx + ((l-22)/l) * dx;
	ey = sy + ((l-22)/l) * dy;
	
	var h = 20;
	var w = 12;
	var ux,uy,vx,vy;
	var l = Math.sqrt(Math.pow(ex - sx,2) + Math.pow(ey - sy,2));
	ux = (ex - sx) / l;
	uy = (ey - sy) / l;
	vx = -1 * uy;
	vy = ux;
	
	var v1x,v1y,v2x,v2y;
	v1x = ex - h * ux + w * vx;
	v1y = ey - h * uy + w * vy;
	v2x = ex - h * ux - w * vx;
	v2y = ey - h * uy - w * vy;
	
	ctx.strokeStyle = color;
	ctx.lineWidth = width;
	ctx.translate(0,0);
	ctx.scale(1,1);
    ctx.beginPath();
    ctx.moveTo(sx,sy);
    ctx.lineTo(ex,ey);
    ctx.lineTo(v1x,v1y);
    ctx.moveTo(ex,ey);
    ctx.lineTo(v2x,v2y);
    ctx.stroke();
}

function draw_line(sx,sy,ex,ey,color,width,prog){
	var dx,dy;
	var l = Math.sqrt(Math.pow(ex - sx,2) + Math.pow(ey - sy,2));
	dx = ex - sx;
	dy = ey - sy;
	
	ex = sx + (prog / (l * 10)) * dx;
	ey = sy + (prog / (l * 10)) * dy;

	ctx.strokeStyle = color;
	ctx.lineWidth = width;
	ctx.translate(0,0);
	ctx.scale(1,1);
    ctx.beginPath();
    ctx.moveTo(sx,sy);
    ctx.lineTo(ex,ey);
    ctx.stroke();
}

function draw_potential_attack(start, end){
	draw_arrow(parseInt(start.style.left.slice(0,-2),10)+15,
			parseInt(start.style.top.slice(0,-2),10)+15,
			parseInt(end.style.left.slice(0,-2),10)+15,
			parseInt(end.style.top.slice(0,-2),10)+15,
			"red",4);
	draw_arrow(parseInt(start.style.left.slice(0,-2),10)+15,
			parseInt(start.style.top.slice(0,-2),10)+15,
			parseInt(end.style.left.slice(0,-2),10)+15,
			parseInt(end.style.top.slice(0,-2),10)+15,
			"orange",3);
}

function draw_attack(a){
	var start = document.getElementById(a.c1);
	var end = document.getElementById(a.c2);
	draw_arrow(parseInt(start.style.left.slice(0,-2),10)+15,
			parseInt(start.style.top.slice(0,-2),10)+15,
			parseInt(end.style.left.slice(0,-2),10)+15,
			parseInt(end.style.top.slice(0,-2),10)+15,
			"red",3);
	draw_line(parseInt(start.style.left.slice(0,-2),10)+15,
			parseInt(start.style.top.slice(0,-2),10)+15,
			parseInt(end.style.left.slice(0,-2),10)+15,
			parseInt(end.style.top.slice(0,-2),10)+15,
			"yellow",1,a.prog);
}

function display_attacks(gb){
	for(i = 0; i < gb.attacks.length; i++){
		draw_attack(gb.attacks[i]);
	}
}

function find_edge(c1, c2){
	for(i = 0; i < game.map.length; i++){
		if( (game.map[i].c1 == c1 && game.map[i].c2 == c2) 
			|| (game.map[i].c1 == c2 && game.map[i].c2 == c1)){
			return game.map[i];
		}
	}
	return false;
}

function create_attack(edge, c1, c2){
	//console.log(c1);
	return new attack(c1,c2,edge,"x",current_user);
}

function remove_attack(c1,c2){
	if (typeof(c1) != "string"){c1 = c1.id;}
	if (typeof(c2) != "string"){c2 = c2.id;}
	//console.log("removing " + c1 + "->" + c2);
	for(i = 0; i < game.attacks.length; i++){
		if(game.attacks[i].c1 == c1 && game.attacks[i].c2 == c2){
			game.attacks.splice(i,1);
		}
	}
	refresh_context();
}

function accept_attack(response){
	if(current_context == "mil"){
	//check response
	if(response){
		//add the attack to the list of all attacks if you can afford it
		//TODO, ADD AIR CHOICE
		if(pending_attack.dist["land"] != null){pending_attack.type="land";pending_attack.dist=pending_attack.dist["land"];}
		else {pending_attack.type="water";pending_attack.dist=pending_attack.dist["water"];}
		game.attacks.push(pending_attack);
	}
	mil();
	}
}

function isOwnedBy(c,p){
	for(i = 0; i < game.countries.length; i++){
		if(game.countries[i].name == c && game.countries[i].owner == p){
			return true;
		}
	}
	return false;
}

function attack_exists(c1,c2){
	for(i = 0; i < game.attacks.length; i++){
		if(game.attacks[i].c1 == c1 && game.attacks[i].c2 == c2){
			return true;
		}
	}
	return false;
}

var first_click = true;
var first_country = null;
var pending_attack = null;
function clickHandler(id){
	if(current_context == "mil"){
		// in military mode first click = start country
		if(first_click && isOwnedBy(id,current_user)){
			first_country = id;
			first_click = false;
		}
		// second click = target country
		else if(!first_click){
			//show potential attack overlay
			if(first_country != id && !isOwnedBy(id,current_user) && !attack_exists(first_country,id)){
				var start = document.getElementById(first_country);
				var end = document.getElementById(id);

				//find the edge of the attack
				var e = find_edge(first_country, id);
				if(e == false){ console.log("no edge found!"); }
				//create the attack object
				pending_attack = create_attack(e, first_country, id);
				
				//display the cost and details of attack
				draw_potential_attack(start,end);
				show_potential_attack_stats(pending_attack);
			}
			else{first_country = null;second_country = null;}
			first_click = true;
		}
	}
	/*
	//set the clicked country to be yours
	for(j = 0; j < game.countries.length; j++){
		if(game.countries[j].name == id){
			game.countries[j].owner = "user";
		}
	}
	*/
}
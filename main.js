// MAIN.JS
// Alex Breyfogle c2015

// UI Overlay Globals
var main_ui;
var dev_ui;
var mil_ui;
var res_ui;

// Country Click Handling & Drawing Globals
var current_context = "home";
var canvas;
var ctx;

// Context Specific UI Globals
var bank_ui;
var research_ui;
var attack_stat_ui;
var attack_list_ui;

// Displays information for always on UI
function setConstUI(p){
	bank_ui.innerHTML = p.bank;
	research_ui.innerHTML = p.research;
}

// Initialize game components
function init(){
	canvas = document.getElementById('myCanvas');
	ctx = canvas.getContext('2d');
	
	//connect navigation ui
	main_ui = document.getElementById("main-ui");
	dev_ui = document.getElementById("dev-ui");
	mil_ui = document.getElementById("mil-ui");
	res_ui = document.getElementById("res-ui");
	
	dev_ui.style.display = "none";
	mil_ui.style.display = "none";
	res_ui.style.display = "none";
	
	//connect player ui
	bank_ui = document.getElementById("bank_ui");
	research_ui = document.getElementById("research_ui");
	attack_stat_ui = [];
	attack_stat_ui["val"] = $("#attack_stat_ui").children(".val").get(0);
	attack_stat_ui["costL"] = $("#attack_stat_ui").children(".costL").get(0);
	attack_stat_ui["costW"] = $("#attack_stat_ui").children(".costW").get(0);
	attack_stat_ui["costA"] = $("#attack_stat_ui").children(".costA").get(0);
	
	attack_list_ui = document.getElementById("attack_list_ui");
	
	//connect markers
	initmarkers(game);
	
	update();
	setInterval(update, tstep);
	
	//return 0;
}

// reset ui and context variables
function reset_context(){
	//close context specific ui
	main_ui.style.display = "none";
	dev_ui.style.display = "none";
	mil_ui.style.display = "none";
	res_ui.style.display = "none";
	
	//clear potential attack stats
	attack_stat_ui["costL"].innerHTML = "-";
	attack_stat_ui["costW"].innerHTML = "-";
	attack_stat_ui["costA"].innerHTML = "-";
	attack_stat_ui["val"].innerHTML = "-";
	
	//clear attack list
	attack_list_ui.innerHTML = "";
	
	//reset clicks
	first_click = true;
	pending_attack = null;
	
	//clear canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}


// UI navigation functions
function home(){
	reset_context();
	main_ui.style.display = "block";
	current_context = "home";
	display_attacks(game);
}

function dev(){
	reset_context();
	dev_ui.style.display = "block";
	current_context = "dev";
}

function mil(){
	reset_context();	
	mil_ui.style.display = "block";
	current_context = "mil";
	display_attacks(game);
	list_attacks(game);
}

function res(){
	reset_context();	
	res_ui.style.display = "block";
	current_context = "res";
}

function list_attacks(gb){
	for(i = 0; i < gb.attacks.length; i++){
		var a = gb.attacks[i];
		if(a.owner == current_user){
			attack_list_ui.innerHTML += a.c1 + " -> " + a.c2 + '<br><div style="color:red" onclick="remove_attack(' + a.c1 + ',' + a.c2 + ')">X</div>';
		}
	}
}

function show_potential_attack_stats(attack){
	var land_cost = 8;
	var water_cost = 10;
	var air_cost = 4;
	
	attack_stat_ui["costL"].innerHTML = "L: " + attack.dist["land"] * land_cost;
	attack_stat_ui["costW"].innerHTML = "W: " + attack.dist["water"] * water_cost;
	attack_stat_ui["costA"].innerHTML = "A: " + attack.dist["air"] * air_cost;
	attack_stat_ui["val"].innerHTML = attack.c1 + " attacking " + attack.c2;
}
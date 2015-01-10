//MAIN.JS - UI handling
var main_ui;
var dev_ui;
var mil_ui;
var res_ui;

//used to determine what our country clicks mean
var current_context = "home";
var canvas;
var ctx;

var bank_ui;
var research_ui;

var attack_stat_ui;

function setConstUI(p){
	bank_ui.innerHTML = p.bank;
	research_ui.innerHTML = p.research;
}

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
	attack_stat_ui["cost"] = $("#attack_stat_ui").children(".cost").get(0);
	
	//connect markers
	initmarkers(game);
	
	update();
	setInterval(update, tstep);
	
	//return 0;
}


function reset_context(){
	main_ui.style.display = "none";
	dev_ui.style.display = "none";
	mil_ui.style.display = "none";
	res_ui.style.display = "none";
	
	attack_stat_ui["cost"].innerHTML = "-";
	attack_stat_ui["val"].innerHTML = "-";
	
	first_click = true;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}


// UI navigation functions
function home(){
	reset_context();
	main_ui.style.display = "block";
	current_context = "home";
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
}

function res(){
	reset_context();	
	res_ui.style.display = "block";
	current_context = "res";
}

function show_potential_attack_stats(c1,c2){
	attack_stat_ui["cost"].innerHTML = "cost: " + 10;
	attack_stat_ui["val"].innerHTML = c1 + " attacking " + c2;
}
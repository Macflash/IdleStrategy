//MAIN.JS - UI handling
var main_ui;
var dev_ui;
var mil_ui;
var res_ui;

//used to determine what our country clicks mean
var current_context = "home";

var bank_ui;
var research_ui;

function setConstUI(p){
	bank_ui.innerHTML = p.bank;
	research_ui.innerHTML = p.research;
}

function init(){
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
	
	//connect markers
	initmarkers(game);
	
	update();
	setInterval(update, tstep);
	
	//return 0;
}

// UI navigation functions
function home(){
	dev_ui.style.display = "none";
	mil_ui.style.display = "none";
	res_ui.style.display = "none";
	
	main_ui.style.display = "block";
	current_context = "home"
	//return 0;
}

function dev(){
	main_ui.style.display = "none";
	mil_ui.style.display = "none";
	res_ui.style.display = "none";
	
	dev_ui.style.display = "block";
	current_context = "dev"
	//return 0;
}

function mil(){
	main_ui.style.display = "none";
	mil_ui.style.display = "none";
	res_ui.style.display = "none";
	
	mil_ui.style.display = "block";
	current_context = "mil"
	//return 0;
}

function res(){
	main_ui.style.display = "none";
	dev_ui.style.display = "none";
	mil_ui.style.display = "none";
	
	res_ui.style.display = "block";
	current_context = "res"
	//return 0;
}
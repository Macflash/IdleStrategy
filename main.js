//STUB

var main_ui;
var dev_ui;
var mil_ui;
var res_ui;

var bank_ui;
var research_ui;

var game;

//ideally called about once per sec
function update(){
	//update markers
	updateMarkers(game,1);
	
	//update bank
	updateBank(player1, 1);
	
	//player1.bank = player1.bank + 1;
	setConstUI(player1);
}

function updateBank(player, time){
	player1.bank += time;
}

function updateMarkers(player, time){
	
}

function setConstUI(player){
	bank_ui.innerHTML = player1.bank;
	research_ui.innerHTML = player1.research;
}

function init(){
	main_ui = document.getElementById("main-ui");
	dev_ui = document.getElementById("dev-ui");
	mil_ui = document.getElementById("mil-ui");
	res_ui = document.getElementById("res-ui");
	
	dev_ui.style.display = "none";
	mil_ui.style.display = "none";
	res_ui.style.display = "none";
	
	bank_ui = document.getElementById("bank_ui");
	research_ui = document.getElementById("research_ui");
	
	update();
	setInterval(update, 1000);
	
	//return 0;
}

// UI navigation functions
function home(){
	dev_ui.style.display = "none";
	mil_ui.style.display = "none";
	res_ui.style.display = "none";
	
	main_ui.style.display = "block";
	//return 0;
}

function dev(){
	main_ui.style.display = "none";
	mil_ui.style.display = "none";
	res_ui.style.display = "none";
	
	dev_ui.style.display = "block";
	//return 0;
}

function mil(){
	main_ui.style.display = "none";
	mil_ui.style.display = "none";
	res_ui.style.display = "none";
	
	mil_ui.style.display = "block";
	//return 0;
}

function res(){
	main_ui.style.display = "none";
	dev_ui.style.display = "none";
	mil_ui.style.display = "none";
	
	res_ui.style.display = "block";
	//return 0;
}
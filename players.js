//stub for player setup
var players = [];
var colors = [];

var p;
p = new player("user","green"); players.push(p);
p = new player("enemy","red"); players.push(p);

for(i = 0; i < players.length; i++){
	colors[players[i].name] = players[i].color;
}
colors["neutral"] = "grey";
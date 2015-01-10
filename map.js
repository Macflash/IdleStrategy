//STUB for map graph connections
var map = [];
var e;
// connections from Britain
e = new edge("Britain", "Germany", null, 2, 2); map.push(e);
e = new edge("Britain", "France", null, 1, 1); map.push(e);
e = new edge("Britain", "Ireland", 1, null, 1); map.push(e);
e = new edge("Britain", "Spain", null, 3, 3); map.push(e);
e = new edge("Britain", "Italy", null, null, 3); map.push(e);
e = new edge("Britain", "Poland", null, null, 3); map.push(e);
e = new edge("Britain", "Ukraine", null, null, 5); map.push(e);
e = new edge("Britain", "Russia", null, null, 6); map.push(e);
// connections from Germany
e = new edge("Germany", "France", 1, null, 1); map.push(e);
e = new edge("Germany", "Ireland", null, null, 3); map.push(e);
e = new edge("Germany", "Spain", null, null, 3); map.push(e);
e = new edge("Germany", "Italy", null, null, 2); map.push(e);
e = new edge("Germany", "Poland", 1, null, 1); map.push(e);
e = new edge("Germany", "Ukraine", null, null, 3); map.push(e);
e = new edge("Germany", "Russia", null, null, 4); map.push(e);
//connections from France
e = new edge("France", "Ireland", null, 2, 2); map.push(e);
e = new edge("France", "Spain", 1, null, 1); map.push(e);
e = new edge("France", "Italy", 1, null, 1); map.push(e);
e = new edge("France", "Poland", null, null, 3); map.push(e);
e = new edge("France", "Ukraine", null, null, 4); map.push(e);
e = new edge("France", "Russia", null, null, 6); map.push(e);


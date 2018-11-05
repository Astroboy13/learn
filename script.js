var database =[
	{
		username: "Ahmed",
		passwoard: "1234"
	}
];
var feed =[
	{
		username: "Awad",
		news: "Got married"
	}, 
	{
		username: "Safa",
		news: "Got married"
	}
];
function sign(x,y){
	if(x === database[0].username && y === database[0].passwoard)
		alert("Signed")
	else
		alert("Hacker");
}
var user = prompt("User :");
var pass = prompt("Pass :");
sign(user,pass)

// Global Variables
const changes = {'w':[0,-1],'s':[0,1],'a':[-1,0],'d':[1,0]};
const arrows = 	{'[A':'w','[B':'s','[C':'d','[D':'a'};
let width = 79;
let hight = 21;
let dx = [];
let dy = [];
let x  = [];
let y  = [];
let fruitDims = [];
let id;
let isPlaying;
let snakeLenght;
let delay;
let score;
let fruit;
/*
   *	To Do: Control speed
*/
// functions
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}
function putFruit(){
	while(true){
		let a = randInt(1,hight-1);
		let b = randInt(1,width-1);
		if(isValid(b,a)){
			fruit = true;
			fruitDims = [a,b];
			break;
		}
	}
}
function increaseLength(){
	x.push(x[snakeLenght - 1] - dx[snakeLenght - 1]);
	y.push(y[snakeLenght - 1] - dy[snakeLenght - 1]);
	dx.push(dx[snakeLenght - 1]);
	dy.push(dy[snakeLenght - 1]);
	snakeLenght++;
	delay = Math.max(delay-5,20);
	score += (250 - delay);
	clearInterval(id);
	id = setInterval(function(){ printGrid() },delay);
	putFruit();
}
function isSnake(a,b){
	for (var i = 0; i < snakeLenght; i++) {
		if(x[i] === b && y[i] === a)
			return true;
	}
	return false;
}
function printGrid(){
	console.clear();
	console.clear();
	if(!fruit){
		putFruit();
	}
	if(updatePosition()){
		console.log();
		console.log();
		var temp = '';
		for (var i = 0; i < hight; i++) {
			temp += ' ';
			for (var j = 0; j < width; j++) {
				if(isSnake(i,j)){
					temp += '*';
				} else if(i == 0 || j ==0 || i == hight-1 || j == width-1){
					temp += 'X';
				} else if(i === fruitDims[0] && j === fruitDims[1]){
					temp += 'O';	
				} else{
					temp += ' ';
				}
			}	
			temp += '\n';
		}
		console.log(temp);
		console.log('\t\t\t\tScore:',score,'pts');
	}else{
		isPlaying = false;
		id._idleTimeout = 20000;
		clearInterval(id);
		console.clear();
		console.log('\n\n \t\t\t\tYou\'re DEAD!!!\n\n\n \t\t\t');
		console.log('Do you want to play again ? [Y/n]:');
		// setTimeout(() => { process.exit(); },19500);
	}
}
function snakeBody(a,b){
	for (var i = 1; i < x.length; i++) {
		if(x[i] === a && y[i] === b)
			return true;
	}
	return false;
}
function isValid(x,y){
	return x > 0 && x < width-1 
		&& y > 0 && y < hight-1
		&& !snakeBody(x,y);
}
function updateChanges(val){
	if( dx[0] != -changes[val][0] || dy[0] != -changes[val][1] ){
		dx[0] = changes[val][0];
		dy[0] = changes[val][1];
	}
}
function updatePosition(){
	if(isValid(x[0] + dx[0],y[0] + dy[0])){
		for (var i = 0; i < snakeLenght; i++) {
			x[i] += dx[i];
			y[i] += dy[i];
		}
		for (var i = snakeLenght-1; i > 0; i--) {
			dx[i] = dx[i-1];
			dy[i] = dy[i-1];
		}
		if(y[0] === fruitDims[0] && x[0] === fruitDims[1]){
			fruit = false;
			increaseLength();
		}
		return true;
	}
	return false;
}
function initVars(){
	isPlaying = true;
	fruit = false;
	snakeLenght = 2;
	delay = 250;
	score = 0;
	dx.push(1);
	dy.push(0);
	x.push(Math.floor(width/2));
	y.push(Math.floor(hight/2));
	x.push(x[0]-dx[0])
	y.push(y[0]-dy[0]);
	dx.push(dx[0]);
	dy.push(dy[0]);
	putFruit();
}
function start(){
	dx = [];
	dy = [];
	x = [];
	y = [];
	initVars();
	id = setInterval(function(){ 
		printGrid() 
	}
	,delay);
}
// Keyboard Listener
const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (str, key) => {
	if(isPlaying){
		if ( str === 'q') {
			process.exit();
		} else if('ASDWasdw'.includes(str)) {
			updateChanges(str.toLowerCase());
		} else if('[A[B[C[D'.includes(key.code)){
			updateChanges(arrows[key.code])
		}
		// Testing condition
		else if(str === 'i'){
			increaseLength();
		}
	}else{
		if(key.code ){
		}else if( str.toLowerCase() === 'y'){
			console.clear();
			start();
		}else{
			process.exit();
		}
	}
});
// Start
start();
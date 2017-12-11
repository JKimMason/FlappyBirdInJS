const cvs = document.getElementById("flap");
const ctx = cvs.getContext("2d");

//Load image
const bird = new Image();
const bg = new Image();
const fg = new Image();
const pipeNorth = new Image();
const pipeSouth = new Image();

bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeNorth.src = "img/pipeNorth.png";
pipeSouth.src = "img/pipeSouth.png";


// Variable
var gap = 85;
var constant = pipeNorth.height+gap;

// Bird position
var bX = 10;
var bY = 150;

// Gravity
var gravity = 1.5;
var score = 0;

// Audio files
var fly = new Audio();
var scor = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";

// Key control
document.addEventListener("keydown", moveUp);

function moveUp(){
	bY -= 20;
	fly.play();
}

// Pipe coordinates
var pipe = [];
pipe[0] = {
	x : cvs.width,
	y : 0
}


// Draw images
function draw() {
	//Background
	ctx.drawImage(bg,0,0);

	for (var i=0; i<pipe.length; i++){
		ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
		ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);
		pipe[i].x--;
		if(pipe[i].x == 125){
			pipe.push({
				x : cvs.width,
				y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height 
			});
		}

		if(bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && bY <= pipe[i].y 
			+ pipeNorth.height || bY+bird.height >=
			pipe[i].y+constant || bY + bird.height >= cvs.height - fg.height){
				location.reload();	//Reload page
		}
		if(pipe[i].x == 5){
			score++;
			scor.play();
		}

	}


	ctx.drawImage(fg,0,cvs.height-fg.height);
	ctx.drawImage(bird,bX,bY);
	bY += gravity;
	ctx.fillStyle = "#000";
	ctx.font = "20px Verdana";
	ctx.fillText("Score : " + score,10,cvs.height-20);
	requestAnimationFrame(draw);
}

draw();
//setting up basic canvas
let canvas = document.getElementById("canvas");
let canvasContext = canvas.getContext("2d");

function setDimension(){
  canvas.height = innerHeight;
  canvas.width = innerWidth;  
}

window.onload=setDimension();



//adding images

let img = new Image();
img.src = "img/main.png";
let deadBirdimg = new Image();
deadBirdimg.src = "img/deadBird.png";
let ballImg = new Image();
ballImg.src = "img/cricket.png";
let frameCounter = 0;


//adding audio 
let flapBird = new Audio();
flapBird.src ="audio/flap.wav";
let hit = new Audio();
hit.src ="audio/hit.wav";
let die = new Audio();
die.src ="audio/die.wav";
let scoreInc = new Audio();
scoreInc.src ="audio/point.wav";
let begin = new Audio();
begin.src ="audio/swooshing.wav";




let state = {
current: 0,
start: 0,
play: 1,    //state Object for 3 states
end: 2 
}

//creating pointer on hover at right place
canvas.addEventListener("mousemove",function(e){
  //checking for starting game
  let cvsP = canvas.getBoundingClientRect();
  let clickX = e.clientX-cvsP.left;
  let clickY = e.clientY-cvsP.top;
  let sClickX1 = canvas.width/2 - 17.5;
  let sClickX2 = canvas.width/2 + 17.5;
  let sClickY1 = startGame.y+90; 
  let sClickY2 = canvas.height/2;
  if(state.current==state.start){
    if(clickX>=sClickX1&&clickX<=sClickX2&&clickY>=sClickY1&&clickY<=sClickY2)
      {
        canvas.style.cursor = "pointer";
      }
   else{
        canvas.style.cursor = "default";
      }
  }
  if(state.current==state.play){
    canvas.style.cursor == "pointer";
  }
  //checking for ending game
  if(state.current==state.end){
       let btnX1 = canvas.width/2 - 40;
       let btnX2 = canvas.width/2 + 40;
       let btnY1 = gameOver.y + 172;
       let btnY2 = gameOver.y + gameOver.h;
       if(clickX>=btnX1&&clickX<=btnX2&&clickY>=btnY1&&clickY<=btnY2){
        canvas.style.cursor = "pointer";
       }
       else{
        canvas.style.cursor = "default";
      }
  }
})

//event for stating and ending click functionality
canvas.addEventListener("click",function(e){
  let cvsP = canvas.getBoundingClientRect();
  let clickX = e.clientX-cvsP.left;
  let clickY = e.clientY-cvsP.top;
  switch(state.current)
  {
     case state.start:

      let sClickX1 = canvas.width/2 - 17.5;
      let sClickX2 = canvas.width/2 + 17.5;
      let sClickY1 = startGame.y+90; 
      let sClickY2 = canvas.height/2;
      if(clickX>=sClickX1&&clickX<=sClickX2&&clickY>=sClickY1&&clickY<=sClickY2)
      {
        begin.play();
        startGame.start();
        state.current=state.play;
      }
       break;
     case state.play:
       flapBird.play();
       bird.moveBird();
       break;
     case state.end:
      let btnX1 = canvas.width/2 - 40;
      let btnX2 = canvas.width/2 + 40;
      let btnY1 = gameOver.y + 172;
      let btnY2 = gameOver.y + gameOver.h;
       if(clickX>=btnX1&&clickX<=btnX2&&clickY>=btnY1&&clickY<=btnY2){
        gameOver.end();
        state.current=state.start;
       }  
       break;
  }
})

//cloud object
let cloud = {
  sX : 0,
  sY : 0,
  h : 220,
  w : 275,
  x : 0,
  y : canvas.height - 220,
  dx:3,
  drawImg : function(){
      canvasContext.drawImage(img,this.sX,this.sY,this.w,this.h,this.x,this.y,this.w,this.h);
      canvasContext.drawImage(img,this.sX,this.sY,this.w,this.h,this.x+this.w,this.y,this.w,this.h);
      canvasContext.drawImage(img,this.sX,this.sY,this.w,this.h,this.x+(this.w*2),this.y,this.w,this.h);
      canvasContext.drawImage(img,this.sX,this.sY,this.w,this.h,this.x+(this.w*3),this.y,this.w,this.h);
      canvasContext.drawImage(img,this.sX,this.sY,this.w,this.h,this.x+(this.w*4),this.y,this.w,this.h);
      canvasContext.drawImage(img,this.sX,this.sY,this.w,this.h,this.x+(this.w*5),this.y,this.w,this.h);
  }}


//ground object  
let ground = {
  sX : 276,
  sY : 0,
  h : 112,
  w : 224,
  x : 0,
  y : canvas.height - 112,
  dx:3,
  drawImg : function(){
      canvasContext.drawImage(img,this.sX,this.sY,this.w,this.h,this.x,this.y,this.w,this.h);
      canvasContext.drawImage(img,this.sX,this.sY,this.w,this.h,this.x+this.w,this.y,this.w,this.h);
      canvasContext.drawImage(img,this.sX,this.sY,this.w,this.h,this.x+(this.w*2),this.y,this.w,this.h);
      canvasContext.drawImage(img,this.sX,this.sY,this.w,this.h,this.x+(this.w*3),this.y,this.w,this.h);
      canvasContext.drawImage(img,this.sX,this.sY,this.w,this.h,this.x+(this.w*4),this.y,this.w,this.h);
      canvasContext.drawImage(img,this.sX,this.sY,this.w,this.h,this.x+(this.w*5),this.y,this.w,this.h);
      canvasContext.drawImage(img,this.sX,this.sY,this.w,this.h,this.x+(this.w*6),this.y,this.w,this.h);
      canvasContext.drawImage(img,this.sX,this.sY,this.w,this.h,this.x+(this.w*7),this.y,this.w,this.h);
      canvasContext.drawImage(img,this.sX,this.sY,this.w,this.h,this.x+(this.w*8),this.y,this.w,this.h);
  },
  moveGround: function(){
    if(state.current===state.play){
    this.x -= 3;
    if(this.x%112==0){
      this.x=0;
    }}
  }
}


//bird Object
let bird = {
  BirdCoordinates : [{bx:276,by:112},{bx:276,by:139},{bx:276,by:164},{bx:276,by:139}], //different coordinates for each picture (3 picture used)
  x: 150,
  y: canvas.height/5,
  w: 34,
  h: 26,
  frame:0,
  period:5,
  speed:0,
  gravity:0.2,
  jump :4.6,
  collisionStatus : false,
  drawImg:function(){
    let brd = this.BirdCoordinates[this.frame];
    if(state.current!=state.end){
    canvasContext.drawImage(img,brd.bx,brd.by,this.w,this.h,this.x,this.y,this.w,this.h);
  }else{
    canvasContext.drawImage(deadBirdimg,0,0,50,50,this.x,this.y-10,50,50);
  }
  },
  updateFrame :function(){  //funtion to make the bird Flap
    if(state.current!==state.end)
    { //bird will not flap when dead
    this.period = state.current===state.start?10:5;
    this.frame += (frameCounter%this.period==0)?1:0; //change frame per period count(5 as of now)
    this.frame %= this.BirdCoordinates.length;
    }  //setting frame range (0-3)
    if(state.current!==state.start && parseInt(this.y+this.h)<=parseInt(canvas.height-ground.h)) 
      {
        this.y += this.speed;
        this.speed += this.gravity;    //code for making bird fall
      }
      if(parseInt(this.y+this.h)>=parseInt(canvas.height-ground.h)){
        if(state.current===state.play)
        {
          die.play();
          state.current=state.end;   //when bird touches the ground
        }
        if(state.current===state.end&&this.collisionStatus)
          {
            die.play();
            this.collisionStatus = false;
          }  
      }
      if(this.y<0&&state.current==state.play){
          this.y=0;
      }  
  },
  moveBird:function(){
      this.speed = -this.jump;  //making bird move up when clicked
  },
  checkCollision:function(){ 
    if(state.current===state.play){ //must be in play state
      let p = pipe.position;
      for(let i=0;i<p.length;i++){
        //checking collision for top Pipe 
        bx = (this.x+this.w/2);
        by = this.y;
        TPx1 = p[i].x;
        TPx2 = p[i].x+pipe.w;
        TPy1 = p[i].y;
        TPy2 = p[i].y+pipe.hd;
        if((bx>=TPx1&&bx<=TPx2)&&(by>=TPy1&&by<=TPy2)){
          hit.play();
          gameOver.endGame();}
        //checking collision for bottom Pipe
        by=this.y+this.h;
        BPx1 = p[i].x;
        BPx2 = p[i].x+pipe.w;
        BPy1 = p[i].y+pipe.hd+pipe.gap;
        BPy2 = p[i].y+pipe.hd+pipe.gap+pipe.gap;
        if((bx>=BPx1&&bx<=BPx2)&&(by>=BPy1&&by<=BPy2)){
          hit.play();
          gameOver.endGame();}   
      }
      
       //checking collision for ball
       let b = ball.position;
       for(let i=0;i<b.length;i++){
        //checking collision for top Pipe 
        bx = (this.x+this.w/2);
        //collision from top
        by = this.y;
        TPx1 = b[i].x;
        TPx2 = b[i].x+ball.w;
        TPy1 = b[i].y;
        TPy2 = b[i].y+ball.h;
        if((bx>=TPx1&&bx<=TPx2)&&(by>=TPy1&&by<=TPy2)){
          hit.play();
          gameOver.endGame();
        }
        by= this.y+this.w;
        if((bx>=TPx1&&bx<=TPx2)&&(by>=TPy1&&by<=TPy2)){
          hit.play();
          gameOver.endGame();
        }
    }

  }
}}


//pipe Object
let pipe = {
  top : {sX:553,sY:0},
  bottom : {sX:502,sY:0},
  w:53,
  h:400,
  wd : 53,
  hd : (canvas.height)/2,
  position : [],
  gap:120,   //gap between the two pipes
  maxYPos : -150,  //variable for deciding pipeLength
  dx:3, //spead for moving pipes
  drawImg:function(){
    if(state.current!==state.start){
      for(let i=0;i<this.position.length;i++)
      {
      canvasContext.drawImage(img,this.top.sX,this.top.sY,this.w,this.h,this.position[i].x,this.position[i].y,this.wd,this.hd);
      canvasContext.drawImage(img,this.bottom.sX,this.bottom.sY,this.w,this.h,this.position[i].x,(this.position[i].y+this.hd+this.gap),this.wd,this.hd);
      }
  }
  },
  //function for moving pipes
  movePipes:function(){
    if(state.current===state.play){
      if(frameCounter%100===0){
        //each pipe gets its initail width behind the right most corner
        this.position.push({x: canvas.width, y: this.maxYPos*Math.random()+1});
      }
        //code for moving pipes forward
      for(let i=0;i<this.position.length;i++){
        let p = this.position[i];
         p.x -= this.dx;
        //what to do when pipe crosses the left end of screen
         if(p.x+this.wd<0){
          this.position.shift();
        }
      }
    }
  }
}

//ball Object
let ball = {
  sX : 0,
  sY : 0,
  w : 30,
  h : 30,
  position:[],
  dx : 4,
  drawImg : function(){
    if(state.current!==state.start){
      for(let i=0;i<this.position.length;i++)
      {
      canvasContext.drawImage(ballImg,this.sX,this.sY,2000,2000,this.position[i].x,this.position[i].y,this.w,this.h);
      }
      }
  },
  moveBall:function(){
    if(state.current===state.play){
      if(frameCounter%100===0){
        let p = {x : canvas.width, y : (Math.random()*(canvas.height)*(2/3))};
        this.position.push(p);
      }
      for(let i=0;i<this.position.length;i++){
        let p = this.position[i];
         p.x -= this.dx;
         if(p.x+this.w<0){
          this.position.shift();
          }
        }
      }    
  }
}

//score Object
let scoreBoard = {
  score : 0,
  best : parseInt(localStorage.getItem("best"))?parseInt(localStorage.getItem("best")):0,
  drawScore : function(){
    canvasContext.fillStyle = "#000000";
    canvasContext.font = "35px monospace";
    if(state.current===state.play){
      canvasContext.fillText(`Score : ${this.score}`,canvas.width-250,100);
    }
  },
  updateScore : function(){  //function for updating score
    if(state.current===state.play){
      let p = pipe.position;
      for(let i =0;i<p.length;i++)
      {
        if(p[i].x+pipe.wd+1==bird.x||p[i].x+pipe.w+2==bird.x||p[i].x+pipe.w+3==bird.x){
          scoreInc.play(); //play sound during score update
          this.score++;
        }
      }
    }
    else if(state.current===state.end)  //for updating the best score
    {
      if(this.score>=this.best){
        this.best = this.score;
        localStorage.setItem('best',this.best);
    }
    canvasContext.fillStyle = "#000000";
    canvasContext.font = "25px monospace";
    canvasContext.fillText(this.score,canvas.width/2+65,gameOver.y+95);
    canvasContext.fillText(this.best,canvas.width/2+65,gameOver.y+135);
    }
  }
}


//Wellcome Frame/Screen
let startGame = {
  sX : 0,
  sY : 228,
  w : 173,
  h : 152,
  x : canvas.width/2 - (173/2),
  y : canvas.height/2 - 152,
  drawImg:function(){
    if(state.current===state.start){
      document.querySelector("#fire1").style.display="none";
      document.querySelector("#fire2").style.display="none";
      canvasContext.drawImage(img,this.sX,this.sY,this.w,this.h,this.x,this.y,this.w,this.h);
    }
  }, 
  start:function(){
    if(state.current===state.start){
      pipe.position.splice(0,pipe.position.length);
      ball.position.splice(0,ball.position.length);
    }
  }
}


//GameOver Frame/Screen
let gameOver = {
  sX : 175,
  sY : 228,
  w : 225,
  h : 202,
  x : canvas.width/2 - (225/2),
  y : canvas.height/2 - (202),
  drawImg:function(){
    if(state.current===state.end){
      canvasContext.drawImage(img,this.sX,this.sY,this.w,this.h,this.x,this.y,this.w,this.h);
      document.querySelector("#fire1").style.display="inline-block";
      document.querySelector("#fire2").style.display="inline-block";
    }
  },
  //funtion called when the bird collides and we lose 
  endGame:function(){
    bird.collisionStatus = true;
    state.current=state.end;
  },
  //funtion called when we restart the game 
  end: function(){
    bird.y=150;
    bird.speed=0;
    scoreBoard.score=0;
    medal.counter = -1;
  }
}


//medal Object 
let medal ={
  x : gameOver.x+25,
  y: gameOver.y+85,
  w : 45,
  h: 45,
  position : [{x:360,y:158},{x:360,y:112},{x:312,y:158}],
  counter : -1,
  drawImg:function(){
    if(state.current===state.end && this.counter>=0){
      canvasContext.drawImage(img,this.position[this.counter].x,this.position[this.counter].y,this.w,this.h,this.x,this.y,this.w,this.h);
    }
  },
  updateScore : function(){
    if(scoreBoard.best>5){  // medals will be only provided once the highscore is above 5
      if(scoreBoard.score>=(scoreBoard.best))
    {
      this.counter=2;
    }
    else if(scoreBoard.score>=(scoreBoard.best*(2/3)))
    {
      this.counter=1;
    }
    else if(scoreBoard.score>=(scoreBoard.best*(1/3))){
      this.counter=0;
    }
    }    
  }
}



function draw(){
  canvasContext.fillStyle = "#87CEEB";  //setting canvas properties
  canvasContext.fillRect(0,0,canvas.width,canvas.height);
  //calling draw funtions of objects
  cloud.drawImg(); 
  pipe.drawImg();
  startGame.drawImg(); 
  ground.drawImg();
  ball.drawImg();
  bird.drawImg();
  gameOver.drawImg();
  scoreBoard.drawScore();
  medal.drawImg();
}

function update(){    //FUNTION FOR ALL THE MOVEMENTS AND UPDATES
  ground.moveGround();
  bird.updateFrame();
  pipe.movePipes();
  ball.moveBall();
  bird.checkCollision();
  scoreBoard.updateScore();
  medal.updateScore();
}


function loop() {  //this function calls itself contineously with each frame
  draw(); // responsible for drawing all contents
  update(); // responsible for moveing all contents
  frameCounter = (frameCounter === 10000)?0:frameCounter+1; //counter that updates with each framerate
  window.resizeTo(1440,489);
  requestAnimationFrame(loop);
}

loop(); //begin the program
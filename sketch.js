//variables for images and characters
var forest,idleR,idleL,runRight,runLeft,jump,fall,player,gImg,aMode = "idle",dir = "right",gMode = "yes";

//loading images and animations
function preload() {
    forest = loadImage("images/background.jpg");
    gImg = loadImage("images/ground.png");
    idleR = loadAnimation("images/idle1.png",
                        "images/idle2.png",
                        "images/idle3.png",
                        "images/idle2.png",);
    idleL = loadAnimation("images/idle1_2.png",
                        "images/idle2_2.png",
                        "images/idle3_2.png",
                        "images/idle2_2.png",);
    runRight = loadAnimation("images/run1.png",
                        "images/run2.png",
                        "images/run3.png",
                        "images/run4.png",
                        "images/run5.png",
                        "images/run6.png",
                        "images/run7.png",
                        "images/run8.png",
                        "images/run9.png",
                        "images/run10.png");

    runLeft = loadAnimation("images/run1_2.png",
                        "images/run2_2.png",
                        "images/run3_2.png",
                        "images/run4_2.png",
                        "images/run5_2.png",
                        "images/run6_2.png",
                        "images/run7_2.png",
                        "images/run8_2.png",
                        "images/run9_2.png",
                        "images/run10_2.png");
}

//seting canvas and characters and objects
function setup() {
    createCanvas(displayWidth, displayHeight);

    //background
    background1 = createSprite(displayWidth/2,displayHeight/2);
    background1.addImage(forest);
    background1.scale = 3;

    //player settings
    player = createSprite(displayWidth/2,displayHeight-300,40,80);
    player.addAnimation("runningR",runRight);
    player.addAnimation("runningL",runLeft);
    player.addAnimation("stillR",idleR);
    player.addAnimation("stillL",idleL);
    player.scale = 0.45;

    //grounds
    ground = createSprite(displayWidth/2-300,displayHeight-40,displayWidth,80);
    ground.addImage(gImg);
    ground.scale = 1.8;

    ground2 = createSprite(displayWidth-170,displayHeight-40,displayWidth,80);
    ground2.addImage(gImg);
    ground2.scale = 1.8;

    ground3 = createSprite(displayWidth+930,displayHeight-120,displayWidth,80);
    ground3.addImage(gImg);
    ground3.scale = 1.8;
}

//drawing the sprites
function draw() {

    //background
    background("white");

    //statements for animations
    if(aMode === "right") {
        player.changeAnimation("runningR",runRight);
    }else if(aMode === "left") {
        player.changeAnimation("runningL",runLeft);
    }else if(aMode === "idle") {
        if(dir === "right") {
            player.changeAnimation("stillR",idleR);
        }else if(dir === "left") {
            player.changeAnimation("stillL",idleL);
        }
    }

    //statements for side movement
    aMode = "idle"

    if(keyDown("RIGHT_ARROW")) {
        player.velocityX = 9;
        aMode = "right";
        dir = "right";
    }
    
    if(keyDown("LEFT_ARROW")) {
        player.velocityX = -9;
        aMode = "left";
        dir = "left";
    }

    //friction
    player.velocityX = player.velocityX*0.7;

    //gravity and collision
    if(player.isTouching(ground) || 
        player.isTouching(ground2) || 
        player.isTouching(ground3)) {

        player.velocityY = 0;
        gMode = "yes";
    }else {
        player.velocityY = player.velocityY+0.8;
        gMode = "no";
    }

    //collision
    player.collide(ground);
    player.collide(ground2);
    player.collide(ground3);

    //jump
    if(keyDown("UP_ARROW") && gMode === "yes") {
        player.velocityY = -14;
    }

    //scrolling ground
    ground.velocityX = player.velocityX*-1;
    ground2.velocityX = player.velocityX*-1;
    ground3.velocityX = player.velocityX*-1;

    //scrolling background
    background1.velocityX = player.velocityX/8*-1;
    
    //reset
    player.x = displayWidth/2;

    //ground collider
    ground.setCollider("rectangle",0,10,480,35);
    ground2.setCollider("rectangle",0,10,480,35);
    ground3.setCollider("rectangle",0,10,480,35);

    //checking errors
    console.log(gMode);

    //draw sprites
    drawSprites();
}
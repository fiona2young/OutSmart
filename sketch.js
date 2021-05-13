/************************************************
OutSmart
  by Fiona Young
Overview

Notes:
(1) Uses the p5.2DAdventure class by Scott Kildall,
p5.clickable library by Lartu and modified by Scott Kildall,
and p5.play library by Paolo Pedercini (molleindustria).
************************************************/


//Global Variables
 // managers
var adventureManager;
var clickablesManager;
var clickables;

 // p5.play
var playerSprite;
var playerAnimation;


// Preload code
function preload() {

  clickablesManager = new ClickableManager('data/clickableLayout.csv');
  adventureManager = new AdventureManager('data/adventureStates.csv', 'data/interactionTable.csv', 'data/clickableLayout.csv');
}

// Setup code
function setup() {
  createCanvas(1280, 720);

  // setup the clickables
  clickables = clickablesManager.setup();

  // managing button visibility
  adventureManager.setClickableManager(clickablesManager);

  // load the images, go through state and interation tables, etc
  adventureManager.setup();

  // set up additional info about p5.clickables
  setupClickables(); 

  fs = fullscreen();
}

// Draw code
function draw() {
  // draw background rooms
  adventureManager.draw();

  // draw p5.clickables
  clickablesManager.draw();
}

// pass to adventure manager to draw/undraw events
function keyPressed() {
  // toggle fullscreen mode
  if( key === 'f') {
    fs = fullscreen();
    fullscreen(!fs);
    return;
  }
}

function mouseReleased() {
  // dispatch all mouse events to adventure manager
  adventureManager.mouseReleased();
}


//-------------- CLICKABLES ---------------//

function setupClickables() {
  // same effects for all clickables
  for( let i = 0; i < clickables.length; i++ ) {
    clickables[i].onHover = clickableButtonHover;
    clickables[i].onOutside = clickableButtonOnOutside;
    clickables[i].onPress = clickableButtonPressed;    
  }
}

// tint when mouse is over
clickableButtonHover = function () {
  this.noTint = false;
  this.tint = "#AAAAAA";
  cursor(HAND);
}

clickableButtonOnOutside = function () {
  this.color = "#00000000";
  this.strokeWeight = 0;
  cursor(ARROW);
}
 
clickableButtonPressed = function() {
  adventureManager.clickablePressed(this.name);
} 


//-------------- SUBCLASSES / YOUR DRAW CODE CAN GO HERE ---------------//

class ScenarioRoom extends PNGRoom {

}


// Author: Aris cArter       

// Global UI Variables
let canvasDiv;
let canvas;
let textDiv;
let textP;
let sliderDiv;
let slider;
let sadSpan;
let happySpan;
let buttonDiv;

let addExampleButton;
let trainButton;


// Global ML Variables
let featureExtractor;
let predictor;
let video;
let ismodelReady;
let isTraingComplete;
let addExampes;

function setup() {

}

function draw() {
  canvasDiv = createDiv();
  canvas = createCanvas(640, 480);
  canvas.parent(canvasDiv);
  textDiv = createDiv();
  textP = createP("Model loading please wait...");
  textP.parent(textDiv);
  buildInput();
  //
  addExamples = 0;
  ismodelReady = false;
  isTraingComplete = false;
  video = createCapture(VIDEO, videoReady);



}

function buildInput() {
  //create slider 
  
  slideDiv = createDiv();
  sliderSpan = createSpan("Sad");
  sadSpan.parent(sliderDiv);
  slider = createSlider(0 , 1, 0.5, 0.01);
  slider.parent(sliderDiv);
  happySpan = createSpan("happy");
  happySpan.parent(sliderDiv);
  //create button Div
  buttonDiv = createButton();
  addExampleButton = createButton("Add Exampes");
  addExampleButton.parent(buttonDiv);
  addExampleButton.mousePressed(function (){
    addExamples++;
    textP.html("Add exapmles" + addExamples);
    predictor.addImage(canvas, slider.value());
  });
  trainButton = createButton("Train model");
  trainButton.parent(buttonDiv);
  trainButton.mousePressed(function() {
    buttonDiv.style("display", "none");
    sliderDiv.style("display", "none");
    predictor.train(whileTraining);
  });

}

function videoReady() {

}

function featureExtractorLoaded() {

}

function modelReady() {

}

function whileTraining(loss) {

}

function gotResults(error, results) {

}

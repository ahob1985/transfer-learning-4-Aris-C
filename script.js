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

function draw() {
  if (ismodelReady){
    image(video, 0, 0);

  }
  if(isTraingComplete){
    predictor.predict(canvas, gotResults);
  }

}

function buildInput() {
  //create slider 
  
  sliderDiv = createDiv();
  sadSpan = createSpan("Sad");
  sadSpan.parent(sliderDiv);
  slider = createSlider(0, 1, 0.5, 0.01);
  slider.parent(sliderDiv);
  happySpan = createSpan("happy");
  happySpan.parent(sliderDiv);
  //create button Div
  buttonDiv = createDiv();
  addExampleButton = createButton("Add Exampes");
  addExampleButton.parent(buttonDiv);
  addExampleButton.mousePressed(function (){
    addExamples++;
    textP.html("Add exapmles: " + addExamples);
    predictor.addImage(canvas, slider.value());
  });
  trainButton = createButton("Train model");
  trainButton.parent(buttonDiv);
  trainButton.mousePressed(function() {
    buttonDiv.style("display", "none");
    sliderDiv.style("display", "none");
    predictor.train(whileTraining);
  });
  buttonDiv.style("display", "none");
  sliderDiv.style("display", "none");
}

function videoReady() {
video.style("display", "none");
featureExtractor = ml5.featureExtractor("MobileNet", featureExtractorLoaded);
}

function featureExtractorLoaded() {
predictor = featureExtractor.regression(canvas, modelReady);

}

function modelReady() {
  ismodelReady = true;
  textP.html("Begin adding examples to train data!");
  sliderDiv.style("display", "block");
  buttonDiv.style("display", "block");
}

function whileTraining(loss) {
  if(loss) {
    console.log(loss);
  } else {
    isTraingComplete = true;
  }

}

function gotResults(error, results) {
  if(error){
    console.error(error);
  } else{
    console.log(results);
    let value = floor(results.value * 100);
    textP.html("happiness" + value + "% " );
  }

}

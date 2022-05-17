random_number = Math.floor((Math.random() * quick_draw_data_set.length) + 1);
console.log(quick_draw_data_set[random_number]);
sketch = quick_draw_data_set[random_number];
document.getElementById('sketch_name').innerHTML = 'Sketch To be Drawn: ' + sketch;

timer_counter = 0;
timer_check = "";
drawn_sketch = "";
answer_holder = "";
score = 0;

function updateCanvas() {
  background("white");
  random_number = Math.floor((Math.random() * quick_draw_data_set.length) + 1);
  console.log(quick_draw_data_set[random_number]);
  sketch = quick_draw_data_set[random_number];
  document.getElementById('sketch_name').innerHTML = 'Sketch To be Drawn: ' + sketch;
}

function preload() {
  classifier = ml5.imageClassifier('DoodleNet');
}

function setup() {
  canvas = createCanvas(280, 280);
  canvas.center();
  background("white");
  canvas.mouseReleased(classifyCanvas);
}


function draw() {
  // Set stroke weight to 10
  strokeWeight(13);
  // Set stroke color to black
  stroke(0);
  // If mouse is pressed, draw line between previous and current mouse positions
  if (mouseIsPressed) {
    line(pmouseX, pmouseY, mouseX, mouseY);
  }

  check_sketch()
  if(drawn_sketch == sketch)
  {
    answer_holder = "set"
    score++;
    document.getElementById('score').innerHTML = 'Score: ' + score;
  }

}

function classifyCanvas() {
  classifier.classify(canvas, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
  }
  console.log(results);
  drawn_sketch = results[0].label;
  document.getElementById('label').innerHTML = 'Your Sketch: ' + drawn_sketch;

  document.getElementById('confidence').innerHTML = 'Confidence: ' + Math.round(results[0].confidence * 100) + '%';
}


function check_sketch()
{
  timer_counter++;
  document.getElementById('time').innerHTML = 'Timer: ' + timer_counter;
  console.log(timer_counter)
  if(timer_counter > 400)
    {
      timer_counter = 0;
      timer_check = "completed"
    }
    if(timer_check =="completed" || answer_holder == "set")
    {
      timer_check = "";
      answer_holder = "";
      updateCanvas();
    }

}

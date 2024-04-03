let data;

function preload() {
  // Load the CSV data
  data = loadTable('linegraph.csv', 'csv', 'header');
}

function setup() {
  createCanvas(10000, 600);
  drawLineGraph();
}

function drawLineGraph() {
  background(255);
  
  // Set up some variables for the graph
  let xPadding = 50;
  let yPadding = 50;
  let graphWidth = width - 2 * xPadding;
  let graphHeight = height - 2 * yPadding;
  
  // Find the minimum and maximum values in the data
  let minDeaths = Infinity;
  let maxDeaths = -Infinity;
  for (let i = 0; i < data.getRowCount(); i++) {
    let deaths = data.getNum(i, 'deaths');
    minDeaths = min(minDeaths, deaths);
    maxDeaths = max(maxDeaths, deaths);
  }
  
  // Draw the x and y axes
  stroke(0);
  line(xPadding, height - yPadding, width - xPadding, height - yPadding);
  line(xPadding, height - yPadding, xPadding, yPadding);
  
  // Draw the labels for the x and y axes
  textAlign(CENTER);
  textSize(12);
  fill(0);
  text('Time', width / 2, height - 10);
  text('Number of Deaths', 20, height / 2);
  
  // Draw the data points and connect them with lines
  noFill();
  beginShape();
  for (let i = 0; i < data.getRowCount(); i++) {
    let x = map(i, 0, data.getRowCount() - 1, xPadding, width - xPadding);
    let y = map(data.getNum(i, 'deaths'), minDeaths, maxDeaths, height - yPadding, yPadding);
    vertex(x, y);
    // Draw circles at data points for better visibility
    ellipse(x, y, 5, 5);
  }
  endShape();
}
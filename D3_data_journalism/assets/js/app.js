
var svgArea = d3.select("body").select("svg");

  // clear svg is not empty
  if (!svgArea.empty()) {
    svgArea.remove();
  }

// Defining SVG area dimensions
var svgWidth = window.innerWidth;
var svgHeight = window.innerHeight;

// Defining chart margins
var chartMargin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20
};

// Defining dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Selecting html element and appending SVG area
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);
  
  // Appending a group to the SVG area and shifting to the aforementioned margins
  var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

d3.csv('..data/data.csv').then(function(d) {

});
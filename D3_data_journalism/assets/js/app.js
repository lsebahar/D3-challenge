
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
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
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

d3.csv('/assets/data/data.csv').then(function(StateData) {
  StateData.forEach(function(data) {
    data.abbr = + data.abbr;
    data.poverty = +data.poverty;
    data.obesity = +data.obesity
  });
  
  StateData.sort(function (a, b) {
    return a.poverty - b.obesity;
  });

  // Creating scales
  var xLinearScale = d3.scaleLinear()
        .domain(d3.extent(StateData, d => d.poverty))
        .range([0, chartWidth]);

  var yLinearScale = d3.scaleLinear()
    .domain([d3.min(StateData, d => d.obesity)*.9, d3.max(StateData, d => d.obesity)*1.05])
    .range([chartHeight, 0]);

  // create axes
  var xAxis = d3.axisBottom(xLinearScale);
      var yAxis = d3.axisLeft(yLinearScale).ticks(10);

      // append axes
      chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(xAxis);

      chartGroup.append("g")
        .call(yAxis);


  // append circles
  var circlesGroup = chartGroup.selectAll("circle")
  .data(StateData)
  .enter()
  .append("circle")
  .attr("cx", d => xLinearScale(d.poverty))
  .attr("cy", d => yLinearScale(d.obesity))
  .attr("r", "10")
  .attr("fill", "gold")
  .attr("stroke-width", "1")
  .attr("stroke", "black")
  .append("text").text(function(d){
    return d.abbr;
  })

  // Append axes titles
  
var labelsGroup = chartGroup.append("g")
.attr("transform", `translate(${width / 2}, ${height + 20})`);

labelsGroup.append("text")
.attr("x", 0)
.attr("y", 20)
.classed("stateText", true)
.text("Poverty Level");


labelsGroup.append("text")
.attr("x", 0)
.attr("y", 40)
.classed("stateCircle", true)
.text("Obesity Level");

});

// Need labels and axis
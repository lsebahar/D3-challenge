
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
    top: 100,
    right: 100,
    bottom: 100,
    left: 100
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
    data.poverty = +data.poverty;
    data.obesity = +data.obesity
  });
  
  StateData.sort(function (a, b) {
    return a.poverty - b.poverty;
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
  .attr("fill", "lightBlue")
  .style("opacity", 0.5)
  .attr("stroke-width", "1")
  .attr("stroke", "black")

  // Append circle labels
  var circlesTextGroup = chartGroup.append("g")
    .selectAll("text")
    .data(StateData)
    .enter()
    .append("text")
    .attr("x", d => xLinearScale(d.poverty))
    .attr("y", d => yLinearScale(d.obesity))
    .style("font-size", "10px")
    .style("text-anchor", "middle")
    .style("fill", "black")
    .text(d => (d.abbr));

  
// Appending X Axis
var xAxisGroup = chartGroup.append("g")
.attr("transform", `translate(${chartWidth / 2}, ${chartHeight + 20})`);


xAxisGroup.append("text")
.attr("x", 0)
.attr("y", 20)
.attr("font-weight",1000)
.style('fill', 'black')
.classed("stateText", true)
.text("Poverty Rate (%)");

});


// Appending Y Axis
var yAxisGroup = chartGroup.append("g")
.attr("transform", "rotate(-90)", `translate(${chartWidth - 20}, ${chartHeight /2 })`);

yAxisGroup.append("text")
  .attr("text-anchor", "center")
  .attr("y", -30)
  .attr("x", -300)
  .text("Obesity Rate (%)");

var data = [{1: 2, 2: 1, 3: 4, 4: 4, 5: 5}];

var container = d3.select("#chart");
var margin = {top: 0, right: 20, bottom: 25, left: 20},
  width = parseInt(container.style('width'), 10) - margin.left - margin.right,
  height = 80 - margin.top - margin.bottom;

// setup colors
var colorScale = d3.scale.ordinal()
  .range(["grey", "red", "orange", "steelblue", "green"])
  .domain(d3.keys(data[0]));

// cook data
data.forEach(function (d) {
  var x0 = 0; // origin
  d.partitions = colorScale.domain().map(function (group) {
    return {group: group, x0: x0, x1: x0 += +d[group]};
  });
  d.total = d.partitions[d.partitions.length - 1].x1;
});

// add chart
d3.select("#chart svg").remove();
var chart = container.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var xScale = d3.scale.linear()
  .domain([0, d3.max(data, function (d) {
    return d.total
  })])
  .rangeRound([0, width]);

var xAxis = d3.svg.axis()
  .scale(xScale)
  .orient("bottom")
  .tickFormat(d3.format("d"));

// add x axis
chart.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis);

// add bar label
chart.append("g")
  .append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", -7)
  .attr("class", "bar-label")
  .text("Facilites");

var bar = chart.selectAll(".bar")
  .data(data)
  .enter().append("g")
  .attr("class", "g");

// add partitions
bar.selectAll("rect")
  .data(function (d) {
    return d.partitions
  })
  .enter().append("rect")
  .attr("height", height - 5)
  .attr("x", function (d) {
    return xScale(d.x0);
  })
  .attr("width", function (d) {
    return xScale(d.x1) - xScale(d.x0);
  })
  .style("fill", function (d) {
    return colorScale(d.group)
  });

// add values for partitions
bar.selectAll("text")
  .data(function (d) {
    return d.partitions
  })
  .enter().append("text")
  .attr("x", function (d) {
    return (xScale(d.x0) + xScale(d.x1)) / 2
  })
  .text(function (d) {
    return d.x1 - d.x0;
  })
  .attr("y", height / 2)
  .attr("dy", ".2em")
  .attr("class", "bar-value");

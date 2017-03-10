var keys = require('../app/keys');

console.log(keys.getLocationData('DrkArtsObNY'))

const cloudColors = ['#003F7F', '#135393', '#2767A7', '#4F8FCF', '#63A3E3', '#77B7F7', '#9ADADA', '#AEEEEE', '#C2C2C2', '#EAEAEA', '#FBFBFB']

var width = 500,
    height = 500,
    radius = Math.min(width, height) / 2, // 125
    innerRadius = 0.3 * radius;

// pie chart
var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return 5; }); // size of each slice

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([0, 0]) // change location
  .html(function(d) {
    return d.data.time + ":00 - <span style='color:orangered'>" + d.data.clouds * 10 + "%</span>"; // label + value (hour)
  });

// data signifiers
var arc = d3.svg.arc()
  .innerRadius(innerRadius)
  .outerRadius(function (d) {
		// how far out the rays go
    return (radius - innerRadius) * (d.data.clouds / 10.0) + innerRadius;
  });

// ray grid
var outlineArc = d3.svg.arc()
        .innerRadius(innerRadius)
        .outerRadius(radius);

var svg = d3.select("body").append("svg")
    .attr("width", width) // cuts off graph
    .attr("height", height) // cuts off graph
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")"); // position

svg.call(tip); // calling this function on the group above

d3.csv('obs_data.csv', function(error, data) {

	// d is the data from the csv file

  data.forEach(function(d) {

		d.clouds = +d.clouds;
		d.time = +d.time;


    // d.id     =  d.id;
    // d.order  = +d.order;
    // d.color  =  d.color;
    // d.weight = +d.weight;
    // d.score  = +d.score;
    // d.width  = +d.weight;
    // d.label  =  d.label;
  });
  // for (var i = 0; i < data.score; i++) { console.log(data[i].id) }

  var path = svg.selectAll(".solidArc")
      .data(pie(data))
    .enter().append("path")
      .attr("fill", function(d) {

				return cloudColors[d.data.clouds];
			}) // ray fill color
      .attr("class", "solidArc")
      .attr("stroke", "gray")
      .attr("d", arc)
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);

  // var outerPath = svg.selectAll(".outlineArc")
  //     .data(pie(data))
  //   .enter().append("path")
  //     .attr("fill", "none")
  //     // .attr("stroke", "gray") // ray grid outlines
  //     .attr("class", "outlineArc")
  //     .attr("d", outlineArc);

	// big guy in middle
  svg.append("svg:text")
    .attr("class", "aster-score")
    .attr("dy", ".35em")
    .attr("text-anchor", "middle") // text-align: right
    .text('Blackfoot'); // observatory name

});

module.exports = {};

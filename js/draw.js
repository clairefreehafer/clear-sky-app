const d3 = require('d3');

const cloudColors = ['#003F7F', '#135393', '#2767A7', '#4F8FCF', '#63A3E3', '#77B7F7', '#9ADADA', '#AEEEEE', '#C2C2C2', '#EAEAEA', '#FBFBFB']

const width = window.innerWidth,
	height = 800,
	radius = 500,
	innerRadius = 0.3 * radius;

// pie chart
const pie = d3.pie()
	.sort(null)
	.value(function(d) { return 5; }); // size of each slice

// data signifiers
const arc = d3.arc()
	.innerRadius(innerRadius)
	.outerRadius(function (d) {
		// how far out the rays go
		return (radius - innerRadius) * (d.data.clouds / 20.0) + innerRadius;
	});

const svg = d3.select('#chart').append('svg')
	.attr('width', width) // cuts off graph
	.attr('height', height) // cuts off graph
	.attr('fill', 'white')
	.append('g')
	.attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')'); // position

const tooltip = d3.select('#chart')
	.append('div')
	.attr('class', 'tool-tip')
	.style('position', 'absolute')
	.style('z-index', '20')
	.style('visibility', 'hidden');

d3.csv('../d3-sandbox/obs_data.csv', function(error, data) {

	// d is the data from the csv file

	data.forEach(function(d) {

		d.clouds = +d.clouds;
		d.time = +d.time;

	});

	const path = svg.selectAll('.solidArc')
		.data(pie(data))
		.enter().append('path')
		.attr('fill', function(d) {
			return cloudColors[d.data.clouds];
		}) // ray fill color
		.attr('class', 'solidArc')
		.attr('d', arc)
		.attr('stroke', 'none')
		// data hover
		.on('mouseover', function (d, i) {
			d3.select(this)
			.transition()
			.duration(500)
			.attr('transform', 'scale(1.1)');

			return tooltip.style('visibility', 'visible')
				.text(d.data.clouds * 10 + '% cloud cover at ' + d.data.time + ':00');
		})
		.on('mousemove', function () {
			return tooltip.style('top', (event.pageY - 10) + 'px')
				.style('left', (event.pageX + 10) + 'px');
		})
		.on('mouseout', function (d, i) {
			d3.select(this)
			.transition()
			.duration(500)
			.attr('transform', 'scale(1)');

			return tooltip.style('visibility', 'hidden');
		});

});

module.exports = {};

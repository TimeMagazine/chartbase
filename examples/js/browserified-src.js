var d3 = require('d3');
global.d3 = d3;

var chartbase = require("../../chartbase.js");
global.chartbase = chartbase;

require("../../plugins/core");
require("../../plugins/graph");

var ex1 = chartbase("#ex1");

ex1
	.use("core/margin", 30)
	.use("core/resize", {
		w: 500
	})
	.use("core/data", "data/example-1.csv")
	.use("core/scales", "x", "y")
	.use("core/axes", "x", "y")
	.use("graph/bar");

console.log(ex1);
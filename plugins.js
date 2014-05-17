//canonical plugins
chartbase.register("echo", function(message) {		
	return function(chart) {
		console.log(message, chart);
	}
});

chartbase.register("expose", function(message) {		
	return function(chart, control) {
		control.chart = chart;
	}
});

chartbase.register("axis", function(opts) {		
	if (typeof opts === "string") {
		opts = { name: opts };
	}
	if (!opts || !opts.name) {
		console.log("A new axis requires a name.")
		return;
	}

	opts.direction = opts.direction ? opts.direction.toLowerCase()[0] : "h";

	return function(chart) {
		chart.elements.axes = chart.elements.axes || {};

		// defaults
		if (opts.direction === "h") {
			opts.range = opts.range || [chart.margins.left, chart.width - chart.margins.right];
		} else {
			opts.range = opts.range || [chart.height - chart.margins.bottom, chart.margins.top];
		}

		opts.domain = opts.domain || [0, 1]; // to do: guess from data if data is present

		var scale = d3.scale.linear()
			.range(opts.range)
			.domain(opts.domain);

		var axis = d3.svg.axis()
		    .scale(scale)
		    .orient(opts.orient || opts.direction === "h" ? "bottom" : "left")
		    .outerTickSize(1)
		    .innerTickSize(4);
		
		chart.elements.axes[opts.name] = chart.elements.svg.append("g")
			.attr("id", opts.name)
		    .attr("class", (opts.direction === "h" ? "x" : "y") + " axis")
		    .call(axis);

		//styles
		chart.elements.svg.selectAll(".axis .tick text").style("fill", "#808080").style("font", "10px sans-serif");
		chart.elements.svg.selectAll(".axis .tick line").style("stroke-width", "1px").style("stroke", "#808080");

		if (opts.direction === "h") {
			chart.elements.axes[opts.name].attr("transform", "translate(0," + (chart.height - chart.margins.bottom) + ")");
		} else {
			chart.elements.axes[opts.name].attr("transform", "translate(" + chart.margins.left + ",0)");
		}
	}
});
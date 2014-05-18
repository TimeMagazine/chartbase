// for testing
chartbase.register("echo", function(message) {		
	return function(chart) {
		console.log(message, chart);
	}
});

// create a new axis
chartbase.register("axis", function(opts) {		
	if (typeof opts === "string") {
		opts = { name: opts };
	}
	if (!opts || !opts.name) {
		console.log("A new axis requires a name.")
		return;
	}

	opts.margins = opts.margins || { top: 20, right: 20, bottom: 50, left: 50 };
	opts.direction = opts.direction ? opts.direction.toLowerCase()[0] : (opts.name === "y" ? "v" : "h");

	return function(chart) {
		chart.elements.axes = chart.elements.axes || {};

		// defaults
		if (opts.direction === "h") {
			opts.range = opts.range || [opts.margins.left, chart.width - opts.margins.right];
		} else {
			opts.range = opts.range || [chart.height - opts.margins.bottom, opts.margins.top];
		}		

		opts.domain = opts.domain || [0, 1]; // TODO: guess from data if data is present

		opts.tickSize = opts.tickSize || [4, 1];
		opts.tickSize = typeof opts.tickSize === "number" ? [opts.tickSize] : opts.tickSize; 

		var scale = d3.scale.linear() // TODO: allow for nonlinear scales
			.range(opts.range)
			.domain(opts.domain);

		var axis = d3.svg.axis()
		    .scale(scale)
		    .orient(opts.orient || opts.direction === "h" ? "bottom" : "left")
		    .tickSize(opts.tickSize[0], opts.tickSize[1] || 1);
		
		chart.elements.axes[opts.name] = chart.elements.svg.append("g")
			.attr("id", opts.name)
		    .attr("class", (opts.direction === "h" ? "x" : "y") + " axis")
		    .call(axis);

		//styles
		chart.elements.svg.selectAll(".axis .tick text").style("fill", "#808080").style("font", "10px sans-serif");
		chart.elements.svg.selectAll(".axis .tick line").style("stroke-width", "1px").style("stroke", "#808080");

		if (opts.direction === "h") {
			chart.elements.axes[opts.name].attr("transform", "translate(0," + (chart.height - opts.margins.bottom) + ")");
		} else {
			chart.elements.axes[opts.name].attr("transform", "translate(" + opts.margins.left + ",0)");
		}
	}
});

// tired of accessing the chart objects through .use()? Elevate it a property of the chartbase instance
chartbase.register("expose", function(message) {		
	return function(chart, control) {
		control.chart = chart;
	}
});

chartbase.register("data", function(data) {
	if (!Array.isArray(data)) {
		console.log("The \"data\" plugin needs an array.");
		return;
	}

	return function(chart) {
		chart.data = data;
	}
});
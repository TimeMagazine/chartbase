(function (chartbase) {
    var axis = function (chart, name, opts) {
        if (typeof name === "object") {
            opts = name;
            name = opts.name;
        }

        opts = opts || {};

        opts.direction = opts.direction || (name === "y" ? "vertical" : "horizontal");
        opts.direction = opts.direction[0].toLowerCase();

        var duration = opts.duration || 0;
        var delay = opts.delay || 0;

        // few convenience shortcuts for options
        opts.options = opts.options || {};
        if (opts.gridlines) {
            opts.options.tickSize = opts.direction === "v" ? [-chart.properties.width, 0] : [-chart.properties.height, 0]
        }

        chart.elements.axes = chart.elements.axes || {};

        var inner = chart.elements.inner;
        var axes = chart.elements.axes;
        var scale = opts.scale || chart.properties.scales[name];       

        if (typeof scale === "string") {
            scale = chart.scales[scale];
        }

        var axis = axes[name] = d3.svg.axis()
            .scale(scale)
            .tickSize(4, 0)
            .orient(opts.orientation || (opts.direction === "v" ? "left" : "bottom"));

        chartbase.apply_options(opts.options)(axis);

        // only append new element if one isn't already there
        // (we want to be able to re-invoke this plugin on an existing axis for resizing and rescaling)
        inner.selectAll(".chartbase-" + name)
            .data([axes[name]])
            .enter()
            .append("g")
            .attr("class", "chartbase-" + name + " chartbase-axis");

        inner.selectAll(".chartbase-" + name)
            .transition()
            .duration(duration)
            .delay(delay)
            .attr("transform", opts.direction === "v" ? "translate(0,0)" : "translate(0," + chart.properties.height + ")")
            .call(axis);
    };

    chartbase.register("core/axis", axis);

    var axes = function (chart) {
        var opts = Array.prototype.slice.call(arguments, 1);

        opts.forEach(function(o) {
            axis(chart, o);
        });
    } 

    chartbase.register("core/axes", axes);


}).call(this, chartbase);


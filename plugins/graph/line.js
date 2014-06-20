(function (chartbase) {
    var plugin = function (chart, opts) {
        var opts = opts || {};

        var duration = opts.duration || 0;
        var delay = opts.delay || 0;

        var scales = chart.properties.scales;

        var line = d3.svg.line()
            .x(function(d) { return scales.x.plot(d); })
            .y(function(d) { return scales.y.plot(d); });

        chartbase.apply_options(opts)(line);

        // only append new element if one isn't already there
        // (we want to be able to re-invoke this plugin on an existing axis for resizing and rescaling)
        chart.elements.inner.selectAll(".chartbase-line")
            .data([chart.data])
            .enter()
            .append("path")
            .attr("class", "chartbase-line");

        chart.elements.inner.selectAll(".chartbase-line")
            .transition()
            .duration(duration)
            .delay(delay)
            .attr("d", line);

    };

    chartbase.register("graph/line", plugin);

}).call(this, chartbase);



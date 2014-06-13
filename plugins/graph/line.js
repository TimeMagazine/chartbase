(function (chartbase) {
    var plugin = function (chart, opts) {
        var opts = opts || {};

        var scales = chart.properties.scales;

        var line = d3.svg.line()
            .x(function(d) { return scales.x.plot(d); })
            .y(function(d) { return scales.y.plot(d); });

        chartbase.apply_options(opts)(line);

        var linepath = chart.elements.inner.append("path")
            .datum(chart.data)
            .attr("class", "chartbase-line")
            .attr("d", line);

        console.log(linepath);
    };

    chartbase.register("graph/line", plugin);

}).call(this, chartbase);



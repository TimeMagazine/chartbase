(function (chartbase) {
    var plugin = function (base, opts) {
        var opts = opts || {};

        var scales = base.properties.scales;

        var line = d3.svg.line()
            .x(function(d) { return scales.x(d.x); })
            .y(function(d) { return scales.y(d.y); });

        chartbase.apply_options(opts)(line);

        var linepath = base.elements.inner.append("path")
            .datum(base.data)
            .attr("class", "chartbase-line")
            .attr("d", line)
    };

    chartbase.register("jsvine/basic-line", plugin);

}).call(this, chartbase);



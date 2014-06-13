(function (chartbase) {
    var plugin = function (chart, opts) {
        var opts = opts || {};

        var scales = chart.properties.scales;

        var band = Math.round(chart.properties.inner_width / chart.data.length * 0.8);

        var line = d3.svg.line()
            .x(function(d) { return scales.x.plot(d); })
            .y(function(d) { return scales.y.plot(d); });

        chartbase.apply_options(opts)(line);

        var linepath = chart.elements.inner.selectAll(".chartbase-bar")
            .data(chart.data)
            .enter()
            .append("rect")
            .attr("class", "chartbase-bar")
            .attr("x", function(d) {
                return scales.x.plot(d) - band / 2;
            })
            .attr("y", function(d) {
                return scales.y.plot(d);
            })
            .attr("width", band)
            .attr("height", function(d) {
                return chart.properties.inner_height - scales.y.plot(d);
            });
    };

    chartbase.register("graph/bar", plugin);

}).call(this, chartbase);



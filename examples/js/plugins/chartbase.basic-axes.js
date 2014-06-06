(function (chartbase) {
    var plugin = function (base) {
        var inner = base.elements.inner;
        var axes = base.elements.axes;
        var scales = base.properties.scales;

        axes.x = d3.svg.axis()
            .scale(scales.x)
            .orient("bottom");

        inner.append("g")
            .attr("class", "chartbase-x chartbase-axis")
            .attr("transform", "translate(0," + base.properties.height + ")")
            .call(axes.x);

        axes.y = d3.svg.axis()
            .scale(scales.y)
            .orient("left");

        inner.append("g")
            .attr("class", "chartbase-y chartbase-axis")
            .call(axes.y);
    };

    chartbase.register("jsvine/basic-axes", plugin);

}).call(this, chartbase);


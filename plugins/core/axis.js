(function (chartbase) {
    var axis = function (chart, name, opts) {
        if (typeof name === "object") {
            opts = name;
            name = opts.name;
        }

        opts = opts || {};

        opts.direction = opts.direction || (name === "y" ? "vertical" : "horizontal");
        opts.direction = opts.direction[0].toLowerCase();

        chart.elements.axes = chart.elements.axes || {};

        var inner = chart.elements.inner;
        var axes = chart.elements.axes;
        var scale = opts.scale || chart.properties.scales[name];

        if (typeof scale === "string") {
            scale = chart.scales[scale];
        }

        axes[name] = d3.svg.axis()
            .scale(scale)
            .orient(opts.orientation || (opts.direction === "v" ? "left" : "bottom"));

        inner.append("g")
            .attr("class", "chartbase-" + name + " chartbase-axis")
            .attr("transform", opts.direction === "v" ? "translate(0,0)" : "translate(0," + chart.properties.inner_height + ")")
            .call(axes[name]);
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


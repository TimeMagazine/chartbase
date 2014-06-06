(function (chartbase) {
    var plugin = function (base, x_type, y_type) {
        base.properties.scales.x = (x_type || d3.scale.linear)()
            .domain([ 0, d3.max(base.data, function (d) { return d.x; }) ])
            .range([ 0, base.properties.width ]);

        base.properties.scales.y = (y_type || d3.scale.linear)()
            .domain([ 0, d3.max(base.data, function (d) { return d.y; }) ])
            .range([ base.properties.height, 0 ]);
    };

    chartbase.register("jsvine/autoscale", plugin);

}).call(this, chartbase);



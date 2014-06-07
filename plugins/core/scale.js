(function (chartbase) {
    // `name` is a unique ID for the scale
    // opts.property is the property value of each individual data object to map to the scale. Defaults to value of `name`
    // opts.type is the scale time. Defaults to linear
    // opts.direction is "horizontal" or "vertical" ("h" or "v" is fine too)

    var scale = function (chart, name, opts) {
        if (typeof name === "object") {
            opts = name;
            name = opts.name;
        }

        opts = opts || {};
        opts.property = typeof opts.property === "undefined" ? name : opts.property;
        opts.type = opts.type || "linear";
        opts.direction = opts.direction || (name === "y" ? "vertical" : "horizontal");
        opts.direction = opts.direction[0].toLowerCase();

        if (opts.type === "time") {
            var scale = d3.time.scale();
        } else {
            var scale = d3.scale[opts.type]();
        }

        chart.properties.scales = chart.properties.scales || {};

        chart.properties.scales[name] = scale
            .domain(d3.extent(chart.data, function (d) { return d[opts.property]; }));

        if (opts.direction === "v") {
            scale.range([chart.properties.inner_height, 0]);
        } else {
            scale.range([0, chart.properties.inner_width]);
        }

        // can't hurt to remember which property is attached to this scale
        chart.properties.scales[name].opts = opts;

        chart.properties.scales[name].plot = function(obj) {
            return chart.properties.scales[name](obj[opts.property]);
        }
    };

    chartbase.register("core/scale", scale);

    var scales = function (chart) {
        var opts = Array.prototype.slice.call(arguments, 1);

        opts.forEach(function(o) {
            scale(chart, o);
        });
    }

    chartbase.register("core/scales", scales);

}).call(this, chartbase);


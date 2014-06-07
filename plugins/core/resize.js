(function (chartbase) {
    // opts.w = width
    // opts.h = height
    // opts.duration = milliseconds of duration, defaults to 0
    // opts.delay = milliseconds of delay, defaults to 0
    var plugin = function (chart, opts) {
        // Default to non-tweened transition
        var opts = opts || {};

        var aspect = typeof opts.aspect === "number" ? opts.aspect : chart.properties.height / chart.properties.width; // current aspect ratio

        var width = opts.w || parseInt(el.style("width"), 10) || 500; 
        var height = opts.h || width * aspect;   // can specify new width only and keep aspect ratio
        var duration = opts.duration || 0;
        var delay = opts.delay || 0;

        var m = chart.properties.margin;

        chart.properties.width = width;
        chart.properties.height = height;
        chart.properties.inner_width = width - (m.left + m.right);
        chart.properties.inner_height = height - (m.top + m.bottom);

        chart.control.wait();

        chart.el
            .transition()
            .duration(duration)
            .delay(delay)
            .style("width", width)
            .style("height", height)
            .each("end", chart.control.resume);
    };

    chartbase.register("core/resize", plugin);

}).call(this, chartbase);

(function (chartbase) {
    // w = width
    // h = height
    // opts.duration = milliseconds of duration, defaults to 0
    // opts.delay = milliseconds of delay, defaults to 0
    var plugin = function (base, opts) {
        // Default to non-tweened transition
        var opts = opts || {};
        var duration = opts.duration || 0;
        var delay = opts.delay || 0;

        var resize = function (selection) {
            selection
                .attr("width", opts.w)
                .attr("height", opts.h);
        };

        var m = base.properties.margin;
        base.properties.width = opts.w - (m.left + m.right);
        base.properties.height = opts.h - (m.top + m.bottom);

        base.control.wait();
        base.el.transition()
            .duration(duration)
            .delay(delay)
            .call(resize)
            .each("end", base.control.resume);
    };

    chartbase.register("core/resize", plugin);

}).call(this, chartbase);

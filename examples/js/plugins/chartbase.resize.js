(function (chartbase) {
    // w = width
    // h = height
    // opts.duration = milliseconds of duration, defaults to 0
    // opts.delay = milliseconds of delay, defaults to 0
    chartbase.plugins.resize = function (w, h, opts) {
        // Default to non-tweened transition
        var opts = opts || {};
        var duration = opts.duration || 0;
        var delay = opts.delay || 0;

        var resize = function (selection) {
            selection
                .attr("width", w)
                .attr("height", h);
        };

        return function (next) {
            this.el.transition()
                .duration(duration)
                .delay(delay)
                .call(resize)
                .each("end", next);
        };
    };
}).call(this, chartbase);

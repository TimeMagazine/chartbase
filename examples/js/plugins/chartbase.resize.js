(function (chartbase) {
    // w = width
    // h = height
    // opts.duration = milliseconds of duration, defaults to 0
    // opts.delay = milliseconds of delay, defaults to 0
    var plugin = function (w, h, opts) {
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
            var m = this.margin;
            this.width = w - (m.left + m.right);
            this.height = h - (m.top + m.bottom);
            this.el.transition()
                .duration(duration)
                .delay(delay)
                .call(resize)
                .each("end", next);
        };
    };

    chartbase.plugins.resize = plugin;

    if (typeof define === "function" && define.amd) { // RequireJS
        define(plugin);
    } else if (typeof module === "object" && module.exports) { // browserify
        module.exports = plugin;
    }

}).call(this, chartbase);

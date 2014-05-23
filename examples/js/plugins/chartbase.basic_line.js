(function (chartbase) {
    var plugin = function (opts) {
        var opts = opts || {};
        return function (next) {
            var base = this;
            var line = d3.svg.line()
                .x(function(d) { return base.scales.x(d.x); })
                .y(function(d) { return base.scales.y(d.y); });

            chartbase.apply_options(opts)(line);

            var linepath = base.inner.append("path")
                .datum(base.data)
                .attr("class", "chartbase-line")
                .attr("d", line)

            next();
        };
    };

    chartbase.plugins.basic_line = plugin;

    if (typeof define === "function" && define.amd) { // RequireJS
        define(plugin);
    } else if (typeof module === "object" && module.exports) { // browserify
        module.exports = plugin;
    }

}).call(this, chartbase);



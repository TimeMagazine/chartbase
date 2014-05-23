(function (chartbase) {
    var plugin = function (x_type, y_type) {
        return function (next) {
            this.scales.x = (x_type || d3.scale.linear)()
                .domain([ 0, d3.max(this.data, function (d) { return d.x; }) ])
                .range([ 0, this.width ]);

            this.scales.y = (y_type || d3.scale.linear)()
                .domain([ 0, d3.max(this.data, function (d) { return d.y; }) ])
                .range([ this.height, 0 ]);

            next();
        };
    };

    chartbase.plugins.autoscale = plugin;

    if (typeof define === "function" && define.amd) { // RequireJS
        define(plugin);
    } else if (typeof module === "object" && module.exports) { // browserify
        module.exports = plugin;
    }

}).call(this, chartbase);



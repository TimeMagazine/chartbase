(function (chartbase) {
    var plugin = function () {
        return function (next) {
            var base = this;
            base.axes.x = d3.svg.axis()
                .scale(base.scales.x)
                .orient("bottom");

            this.inner.append("g")
                .attr("class", "chartbase-x chartbase-axis")
                .attr("transform", "translate(0," + base.height + ")")
                .call(base.axes.x);

            base.axes.y = d3.svg.axis()
                .scale(base.scales.y)
                .orient("left");

            this.inner.append("g")
                .attr("class", "chartbase-y chartbase-axis")
                .call(base.axes.y);

            next();
        };
    };

    chartbase.plugins.basic_axes = plugin;

    if (typeof define === "function" && define.amd) { // RequireJS
        define(plugin);
    } else if (typeof module === "object" && module.exports) { // browserify
        module.exports = plugin;
    }

}).call(this, chartbase);


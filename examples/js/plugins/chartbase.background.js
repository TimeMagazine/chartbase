(function (chartbase) {
    chartbase.plugins.background = function (fill, extras) {
        var TAG = "rect";
        var CLASS = "chartbase-background";
        var SELECTOR = [ TAG, CLASS ].join(".");
        var extras = extras || {};

        return function (next) {
            if (!this.background) {
                this.el.append(TAG)
                    .attr("class", CLASS)
                    .attr("width", "100%")
                    .attr("height", "100%");
            }
            var bg = this.background = this.el.select(SELECTOR);
            bg.attr("fill", fill);
            d3.map(extras).forEach(function (key, value) {
                bg.attr(key, value);
            });
            next();
        };
    };
}).call(this, chartbase);

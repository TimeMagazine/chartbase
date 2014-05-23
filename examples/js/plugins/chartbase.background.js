(function (chartbase) {
    var plugin = function (fill, extras) {
        var TAG = "rect";
        var CLASS = "chartbase-background";
        var SELECTOR = [ TAG, CLASS ].join(".");
        var extras = extras || {};

        return function (next) {
            if (!this.background) {
                var bg_svg = this.el.append(TAG)
                    .attr("class", CLASS)
                    .attr("width", "100%")
                    .attr("height", "100%");
                var pN = this.el[0][0];
                var first_child = pN.firstChild;
                pN.insertBefore(bg_svg[0][0], first_child);
            }
            var bg = this.background = this.el.select(SELECTOR);
            bg.attr("fill", fill)
                .call(chartbase.apply_attrs(extras));
            next();
        };
    };

    chartbase.plugins.background = plugin;

    if (typeof define === "function" && define.amd) { // RequireJS
        define(plugin);
    } else if (typeof module === "object" && module.exports) { // browserify
        module.exports = plugin;
    }

}).call(this, chartbase);

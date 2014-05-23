(function (chartbase) {

    var plugin = function (top, left, bottom, right) {
        left = left !== undefined ? left : top;
        bottom = bottom !== undefined ? bottom : top;
        right = right !== undefined ? right : left;
        return function (next) {
            this.margin = {
                top: top,
                left: left,
                bottom: bottom,
                right: right
            };
            this.inner.attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
            next();
        };
    };

    chartbase.plugins.margin = plugin;

    if (typeof define === "function" && define.amd) { // RequireJS
        define(plugin);
    } else if (typeof module === "object" && module.exports) { // browserify
        module.exports = plugin;
    }

}).call(this, chartbase);


(function (chartbase) {
    var GOLDEN = 1.61803399;

    // orientation = "landscape" or "portrait"
    // opts = see chartbase.plugins.resize
    chartbase.plugins.golden_resize = function (orientation, opts) {

        var multiplier = {
            landscape: 1/GOLDEN,
            portrait: GOLDEN
        }[orientation];

        if (!multiplier) {
            throw "Orientation must be 'landscape' or 'portrait'";
        } 

        return function (next) {
            var w = this.el.attr("width");
            var h = w * multiplier;
            var resizer = chartbase.plugins.resize(w, h, opts);
            resizer.call(this, next);
        };
    };

}).call(this, chartbase);

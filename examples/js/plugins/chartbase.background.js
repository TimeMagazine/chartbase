(function (chartbase) {
    var plugin = function (base, attrs) {
        var TAG = "rect";
        var CLASS = "chartbase-background";
        var SELECTOR = [ TAG, CLASS ].join(".");
        var extras = extras || {};

        if (!base.elements.background) {
            var bg_svg = base.el.append(TAG)
                .attr("class", CLASS)
                .attr("width", "100%")
                .attr("height", "100%");
            var pN = base.el[0][0];
            var first_child = pN.firstChild;
            pN.insertBefore(bg_svg[0][0], first_child);
        }

        var bg = base.elements.background = base.el.select(SELECTOR);

        bg.call(chartbase.apply_attrs(attrs));
    };

    chartbase.register("core/background", plugin);

}).call(this, chartbase);

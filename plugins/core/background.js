(function (chartbase) {
    var plugin = function (chart, attrs) {
        var TAG = "rect";
        var CLASS = "chartbase-background";
        var SELECTOR = [ TAG, CLASS ].join(".");
        var extras = extras || {};

        if (!chart.elements.background) {
            var bg_svg = chart.el.append(TAG)
                .attr("class", CLASS)
                .attr("width", "100%")
                .attr("height", "100%");
                
            var pN = chart.el[0][0];
            var first_child = pN.firstChild;
            pN.insertBefore(bg_svg[0][0], first_child);
        }

        var bg = chart.elements.background = chart.el.select(SELECTOR);

        bg.call(chartbase.apply_attrs(attrs));
    };

    chartbase.register("core/background", plugin);

}).call(this, chartbase);
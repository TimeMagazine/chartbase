(function (chartbase) {

    var plugin = function (base, top, left, bottom, right) {
        left = left !== undefined ? left : top;
        bottom = bottom !== undefined ? bottom : top;
        right = right !== undefined ? right : left;
        var margin = base.properties.margin = {
            top: top,
            left: left,
            bottom: bottom,
            right: right
        };
        base.elements.inner.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    };

    chartbase.register("core/margin", plugin);

}).call(this, chartbase);


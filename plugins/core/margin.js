;(function () {
    var plugin = function (chart, top, left, bottom, right) {
        left = left !== undefined ? left : top;
        bottom = bottom !== undefined ? bottom : top;
        right = right !== undefined ? right : left;
        var margin = chart.properties.margin = {
            top: top,
            left: left,
            bottom: bottom,
            right: right
        };
        chart.elements.inner.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    };
    chartbase.register("core/margin", plugin);
}());
(function () {
    var root = this;

    var p = chartbase.plugins;

    var parseData = function (d) {
        return {
            x: +d.x,
            y: +d.y
        }    
    };

    var chart = chartbase(".chart")
        .use("core/margin", 30)
        .use("core/resize", { w: 600, h: 400 })
        .use("core/background", {
            "fill": "#EEE",
            "stroke-width": 1,
            "stroke": "black"
        })
        .use(function (base) {
            base.control.wait();
            d3.csv("data/example-1.csv")
                .row(parseData)
                .get(function (error, data) {
                     base.data = data;
                     base.control.resume();
                });
        })
        .use("jsvine/autoscale")
        .use("jsvine/basic-axes")
        .use("jsvine/basic-line", {
            interpolate: "monotone"    
        });

}).call(this);

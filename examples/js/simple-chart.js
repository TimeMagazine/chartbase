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
        .use(p.margin(30))
        .use(p.resize(600, 400))
        .use(p.background("#EEE", {
            "stroke-width": 1,
            stroke: "black"
        }))
        .use(function (next) {
            var base = this;
            d3.csv("data/example-1.csv")
                .row(parseData)
                .get(function (error, data) {
                     base.data = data;
                     next();
                });
        })
        .use(p.autoscale())
        .use(p.basic_axes())
        .use(p.basic_line({
            interpolate: "monotone"    
        }))
        .build();

}).call(this);

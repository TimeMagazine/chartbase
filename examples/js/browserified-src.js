(function () {
    var root = this;

    var d3 = require("./vendor/d3.v3.min.js");
    var chartbase = require("../../chartbase/chartbase.js");
    global.d3 = d3;
    global.chartbase = chartbase;

    var p = {
        margin: require("./plugins/chartbase.margin.js"),
        autoscale: require("./plugins/chartbase.autoscale.js"),
        basic_line: require("./plugins/chartbase.basic_line.js"),
        basic_axes: require("./plugins/chartbase.basic_axes.js"),
        resize: require("./plugins/chartbase.resize.js"),
        background: require("./plugins/chartbase.background.js")
    };

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

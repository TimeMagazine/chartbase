(function () {
    var root = this;

    var p = chartbase.plugins;

    var first_el = d3.select("body").append("svg")
        .attr("class", "chart")
        .node();

    var second_el = d3.select("body").append("svg")
        .attr("class", "chart")
        .node();

    var first = chartbase(first_el)
        .use(p.resize(200, 500))
        .use(p.resize(200, 300))
        .use(p.background("papayaWhip", {
            "stroke-width": 2,
            stroke: "#000"
        }))
        .build();

    var second = chartbase(second_el)
        .use(p.resize(100, 300))
        .use(p.background("red"))
        .use(p.resize(300, 100, { delay: 400 }))
        .use(p.background("blue"))
        .use(p.golden_resize("landscape", { duration: 500 }))
        .use(p.background("red"))
        .build();

}).call(this);

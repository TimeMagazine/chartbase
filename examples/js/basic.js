(function () {
    var root = this;

    var p = chartbase.plugins;

    var chart = root.chartbase(".chart")
        .use(p.resize(200, 500))
        .use(p.background("blue"))
        .use(p.resize(500, 200, { delay: 400 }))
        .use(p.background("red"))
        .use(p.golden_resize("landscape", { duration: 500 }))
        .use(p.background("white", {
            "stroke-width": 1,
            stroke: "black"
        }))
        .build();
    
}).call(this);

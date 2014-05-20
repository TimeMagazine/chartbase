(function () {
    var root = this;

    var size_plugin = function (w, h, transition) {
        return function (next) {
            var resize = function (selection) {
                selection
                    .attr("width", w)
                    .attr("height", h);
            };
            if (transition) {
                this.el.transition()
                    .delay(transition)
                    .call(resize)
                    .each("end", next);
            } else {
                this.el.call(resize);
                next();
            }
        };
    };

    var background_plugin = function (fill) {
        return function (next) {
            this.el.append("rect")
                .attr("width", "100%")
                .attr("height", "100%")
                .attr("fill", fill);
            next();
        };
    };

    var chart = root.chartbase(".chart")
        .use(size_plugin(500, 200))
        .use(background_plugin("blue"))
        .use(size_plugin(200, 500, 500))
        .use(background_plugin("red"))
        .build();
    
}).call(this);

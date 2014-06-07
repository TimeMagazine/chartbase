(function (chartbase) {

    function guessType(v) {
        if (v.replace(/\d+/, "") === "") {
            return parseInt(v, 10);
        }
        if (v.replace(/[\d\.]+/, 10) === "") {
            return parseFloat(v);
        }
        return v;
    }

    var plugin = function (chart, data) {
        // data can be either the actual data or a URL
        if (typeof data === "string") {
            var dataType = data.split(".").slice(-1)[0];
            if (!~["csv", "tsv", "json", "xml"].indexOf(dataType)) {
                console.log("Didn't recognize extension for", data);
                return;
            }
            chart.control.wait();

            d3[dataType](data, function(d) {
                d.forEach(function(o) {
                    for (var prop in o) if (o.hasOwnProperty(prop)) {
                        o[prop] = guessType(o[prop]);
                    }
                });

                chart.data = d;
                chart.control.resume();
                return;
            });
        } else {
            chart.data = data;
        }
    }

    chartbase.register("core/data", plugin);

}).call(this, chartbase);


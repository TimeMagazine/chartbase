(function () {
    var root = this;
    var slice = Array.prototype.slice;

    var chartbase = function (el) {
        var el = d3.select(el);
        var base = {
            el: el,
            inner: el.append("g"),
            background: null,
            data: null,
            margin: {
                top: null,
                right: null,
                bottom: null,
                right: null
            },
            scales: {
                x: null,
                y: null
            },
            axes: {
                x: null,
                y: null
            },
            _queue: []
        };

        // Bare-bones plugin registration
        base.use = function (plugin) {
            base._queue.push(plugin);
            return base;
        };

        // Bare-bones plugin execution
        base.build = function (callback) {
            var cb = callback || function () {};
            var next = function () {
                if (!base._queue.length) { return cb(base); }
                var plugin = base._queue.shift();
                plugin.call(base, next);
            };
            next();
            return base;
        };

        return base
    };
    
    // Global plugin registry; might want to use getters and setters for this
    chartbase.plugins = {};

    // opts can be an array of associative arrays, to control call order,
    // or just an associative array
    chartbase.apply_options = function (opts) {
        var opts = opts instanceof Array ? opts : [ opts ];
        return function (selection) {
            opts.forEach(function (optgroup) {
                d3.map(optgroup).forEach(function (key, value) {
                    var value = value instanceof Array ? value : [ value ];
                    selection[key].apply(selection, value)
                });
            });
        };
    };

    chartbase.apply_attrs = function (attrs) {
        var attr_map = d3.entries(attrs).map(function (ent) {
            return { "attr": [ ent.key, ent.value ] }
        })
        return chartbase.apply_options(attr_map);
    };

    if (typeof define === "function" && define.amd) { // RequireJS
        define(chartbase);
    } else if (typeof module === "object" && module.exports) { // browserify
        module.exports = chartbase;
    } else {
        root.chartbase = chartbase; // directly included
    }
}).call(this);

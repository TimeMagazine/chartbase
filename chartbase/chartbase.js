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


    if (typeof define === "function" && define.amd) { // RequireJS
        define(chartbase);
    } else if (typeof module === "object" && module.exports) { // browserify
        module.exports = chartbase;
    } else {
        root.chartbase = chartbase; // directly included
    }
}).call(this);

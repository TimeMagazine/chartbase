(function () {
    var root = this;
    var slice = Array.prototype.slice;

    var chartbase = function (el) {
        var el = d3.select(el);
        var base = {
            el: el,
            data: null,
            elements: {
                inner: el.append("g"),
                background: null,
                axes: {
                    x: null,
                    y: null
                },
                labels: {
                    x: null,
                    y: null,
                    title: null
                }
            },
            properties: {
                margin: null,
                scales: {
                    x: null,
                    y: null
                }
            },
            control: {
                queue: []
            }
        };

        base.control.invoke = function () {
            if (base.control._waiting) { return false; }
            var invokable = base.control.queue.shift();
            if (invokable) {
                invokable();
                base.control.invoke();
            }
        };

        base.control.wait = function () {
            base.control._waiting = true;    
        };

        base.control.resume = function () {
            base.control._waiting = false;
            base.control.invoke();
        };

        // Bare-bones plugin registration
        base.use = function (plugin_ref) {
            var ref_is_string = typeof plugin_ref === "string";
            var plugin = ref_is_string ?
                chartbase.plugins[plugin_ref] : plugin_ref;
            if (ref_is_string && typeof plugin === "undefined") {
                console.log("Couldn't find a plugin named '" + plugin_ref + "'. Moving on.");
            } else {
                var opt_args = slice.call(arguments, 1);
                var args = [ base ].concat(opt_args);
                var invoker = function () {
                    plugin.apply(plugin, args);
                };
                base.control.queue.push(invoker);
                base.control.invoke();
            }
            return base;
        };

        return base;
    };

    // Global plugin registry; might want to use getters and setters for this
    chartbase.plugins = {};

    chartbase.register = function (name, plugin) {
        if (chartbase.plugins[name]) {
            console.log("Sorry, there is already a plugin registered to '" + name + "'.");
            return false;
        } else {
            chartbase.plugins[name] = plugin;    
            return true;
        }
    };
    
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

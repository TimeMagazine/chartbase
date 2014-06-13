;(function() {	
    var root = this;

	// holds all available plugins for every instance of a chartbase on the page
	var plugins = {};

	var chartbase = function(el) {
		var el = d3.select(el);

		if (!el.node()) {
			return console.log("Chartbase couldn't find the element you gave it.");
		}

		if (!~["svg", "g"].indexOf(el.node().tagName.toLowerCase())) {
			el = el.append("svg");
		}

        var el_width = parseInt(el.style("width"), 10) || 500; // gets computed style as string. But "g" elements return "auto"

		var chart = {
            el: el,
            data: null,
            elements: {
                inner: el.append("g")
            },
            properties: {
                margin: { top: 20, right: 20, bottom: 50, left: 50 },
                el_width: el_width,
                el_height: el_width * 0.618
            },
            control: {
				queue: [],		// plugins to run
				history: [],	// plugins already ran
				_waiting: false
            }
        };

        el.style("height", chart.properties.height);

        // will use these for widths of scales and axes
        chart.properties.width = chart.properties.el_width - (chart.properties.margin.left + chart.properties.margin.right);
        chart.properties.height = chart.properties.el_height - (chart.properties.margin.top + chart.properties.margin.bottom);

        chart.use = function(plugin_ref) {
            var plugin = typeof plugin_ref === "string" ? plugins[plugin_ref] : plugin_ref;

       		if (typeof plugin === "function") {
                var opt_args = Array.prototype.slice.call(arguments, 1),
                	args = [ chart ].concat(opt_args);

                var invoker = function () {
                    plugin.apply(plugin, args);
                };
                chart.control.queue.push(invoker);
            } else {
            	console.log("This plugin was not found or not a function:", plugin_ref);
            	// can optionally fail here
            }

			chart.control.invoke();
            return chart;
        }

		// start/restart the chain of plugins. 
        chart.control.invoke = function () {
            if (chart.control._waiting) { return false; }
            var invokable = chart.control.queue.shift();
            if (invokable) {
                invokable();
                chart.control.history.push(invokable);
                chart.control.invoke();
            }
        };

		chart.control.wait = function () {
            chart.control._waiting = true;    
        };

        chart.control.resume = function () {
            chart.control._waiting = false;
            chart.control.invoke();
        };

        return chart;
    }

	// add new plugins
	chartbase.register = function(name, plugin, overwrite) {
		if (overwrite || !plugins[name]) {
			plugins[name] = plugin;
			return true;
		} else {
			console.log("Sorry, there is already a plugin named \"" + name + "\". If you meant to overwrite it, pass `true` after your function.");
			return false;
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
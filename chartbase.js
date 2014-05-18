!function() {	
	var chartbase = function() {
		// holds all available plugins for every instance of a chartbase on the page
		// storing in closure to avoid accidental overwriting as plugin list expands
		var plugin_roster = {};

		var factory = function(element, settings) {
			settings = settings || {}; // settings takes options so instrinic to charts that they are first-order properties

			// core object 
			var chart = {
				el: element,
				width: settings.width || parseInt(d3.select(element).style("width"), 10)
			}

			chart.height = settings.height ? settings.height : chart.width * (settings.aspect ? settings.aspect : 0.618);

			// by convention, all d3 objections go here
			chart.elements = {
				svg: d3.select(element).append("svg")
					.attr("width", chart.width)
					.attr("height", chart.height)
			};

			// "that"-like object that gets returned
			var control = {
				queue: [],
				wait: false,
				resume: function() {
					this.wait = false;
					invoke();
				}
			};

			// start/restart the chain of plugins. 
			function invoke() {
				if (!control.wait && control.queue.length) {
					control.queue.shift()(chart, control);
					invoke();
				}
			}

			control.use = function(plugin, opts) {
				if (typeof plugin === "string") {
					if (plugin_roster[plugin]) {
						// since plugins return a function, they are executed immediately. 
						plugin = plugin_roster[plugin](opts);
					} else {
						console.log("Couldn't find a plugin named \"" + plugin + "\". Moving on.");
						return control;
					}
				}

				// allows for user to pass an anonymous function that accesses `chart` generically
				if (typeof plugin === "function") {
					control.queue.push(plugin);
					invoke();
				}
				return control; // enables chaining
			}
			return control;
		}

		// add new plugins
		factory.register = function(pluginName, plugin, overwrite) {
			if (overwrite || !plugin_roster[pluginName]) {
				plugin_roster[pluginName] = plugin;
			} else {
				console.log("Sorry, there is already a plugin named \"" + pluginName + "\". If you meant to overwrite it, pass `true` after your function.");
			}
		};

		return factory;
	}();

	if (typeof define === "function" && define.amd) { // RequireJS
	    define(chartbase);
	} else if (typeof module === "object" && module.exports) { // browserify
	    module.exports = chartbase;
	} else {
	    this.chartbase = chartbase; // directly included
	}
}();
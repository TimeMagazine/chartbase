!function() {	
	var chartbase = function() {
		// holds all available plugins for every instance of a chartbase on the page
		// storing in closure to avoid accidental overwriting as plugin list expands
		var plugin_roster = {};

		return {
			// add a plugin. 
			register: function(pluginName, plugin, overwrite) {
				if (overwrite || !plugin_roster[pluginName]) {
					plugin_roster[pluginName] = plugin;
				} else {
					console.log("Sorry, there is already a plugin named \"" + pluginName + "\". If you meant to overwrite it, pass `true` after your function.");
				}
			},
			// pseudo-constructor
			make: function(element, settings) {
				settings = settings || {}; // settings takes only a very minimal number of options that are instrinic to all charts

				// core object 
				var chart = {
					el: element,
					width: settings.width || parseInt(d3.select(element).style("width"), 10)
				}

				chart.height = settings.height ? settings.height : chart.width * (settings.aspect ? settings.aspect : 0.618);
				chart.margins = settings.margins || { top: 20, right: 20, bottom: 50, left: 50 };

				chart.elements = {
					svg: d3.select(element).append("svg")
						.attr("width", chart.width)
						.attr("height", chart.height)
				};

				var control = {
					queue: [],
					wait: false,
					resume: function() {
						this.wait = false;
						invoke();
					}
				};

				function invoke() {
					if (!control.wait && control.queue.length) {
						control.queue.shift()(chart, control);
						invoke();
					}
				}

				control.use = function(plugin, opts) {
					// allow for user to pass an anonymous function that accesses chart generically
					if (typeof plugin === "function") {
						this.queue.push(plugin);
					} else if (typeof plugin === "string") {
						if (plugin_roster[plugin]) {
							this.queue.push(plugin_roster[plugin](opts));
						} else {
							console.log("Couldn't find a plugin named \"" + plugin + "\". Moving on.");
							return that;
						}					
					}
					invoke();
					return control;
				}
				return control;
			}
		}
	}();

	if (typeof define === "function" && define.amd) { // RequireJS
	    define(chartbase);
	} else if (typeof module === "object" && module.exports) { // browserify
	    module.exports = chartbase;
	} else {
	    this.chartbase = chartbase; // directly included
	}
}();
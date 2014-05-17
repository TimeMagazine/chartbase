chartbase
=========

##Plugins

A new plugin can be registered in the following manner:

	chartbase.register("echo", function(message) {		
		return function(chart) {
			console.log(message, chart);
		}
	});

The function that a plugin returns receives two objects: `chart`, which contains all the components of the chart itself, and `control`, a "that"-like object with some basic air-traffic-control functions.


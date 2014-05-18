chartbase
=========

Infinitely customizable Javascript charts, using d3. 

##Getting started

After including [d3](https://github.com/mbostock/d3) and the `chartbase` script on the page, create a new chart by passing it the parent object inside of which the `svg` object will be created. It accepts anything that [`d3.select()`](https://github.com/mbostock/d3/wiki/Selections) accepts: CSS3 selectors or nodes.

	var mychart = chartbase("#mychart");

The `chartbase` function also accepts a minimal number of options:

+`width`, in pixels. Default is the width of the parent container.
+`height`, in pixels. Default is ratio of [0.618:1](http://en.wikipedia.org/wiki/Golden_ratio) to the width.
+`aspect`, a ratio. If height is unspecified, height is set to this fraction of width. Default is 0.618.

	var mychart = chartbase("#mychart", {
        width: 500,
        height: 0.5
    });

##Plugins

Every chart consists of a chain of plugins invoked with `.use()`:

	mychart
		.use("axis", { name: "x", direction: "horizontal" })
		.use("axis", { name: "y", direction: "vertical" });

###Adding plugins
Plugins are supposed to return functions that are executed sequentially and receive two objects: `chart`, which contains all the components of the chart itself, and `control`, a "that"-like object with some basic air-traffic-control functions. The latter argument is only typically needed for altering the timing of plugin execution or the behavior of the `chartbase` instance.

A new plugin can be registered in the following manner:

	chartbase.register("flip", function(opts) {		
		return function(chart) {
			chart.svg.attr("transform", "rotate(180)")
		}
	});

A plugin that makes an asynchronous call that needs to return before the subsequent plugins in the chain fire should set `control.wait` to true. It then assumes the responsibility for restarting the plugin chain with `control.resume()`:

	chartbase.register("async", function() {		
		return function(chart, control) {
			control.wait = true;
	        setTimeout(function() {
	            console.log("Pretend async function has returned.")
	            control.resume()
	        }, 500);
      	}
	});
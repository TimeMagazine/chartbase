var ex1 = chartbase("#ex1");

ex1
	.use("core/margin", 30)
	.use("core/resize", {
		w: 300
	})
	.use("core/data", "data/example-1.csv")
	.use("core/scales", "x", "y")
	.use("core/axes", "x", {
		name: "y",
		gridlines: false
	})
	.use("graph/line", {
        interpolate: "basis"    		
	})
	.use("core/resize", {
		w: 800,
		delay: 1000
	})
	.use("core/scales", "x", "y")
	.use("core/axes", "x", {
		name: "y",
		gridlines: true,
		duration: 1000
	})
	.use("graph/line", {
        interpolate: "basis",
		duration: 1000
	});


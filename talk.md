Talk Page
=========

##Invocation
I went back and forth between an object and a function for the parent of all instances on the page. I went with a function because it allows us to store the plugins in a closure with a simple registration function that prevents accidental overwriting (but permits it explicitly).

##Closures
There will naturally be an object to contain all the fun stuff that the plugins create. This could be the instance of `chartbase` itself. I don't like overly restricting things, but I think it's best to distinguish between the chart itself and the object that contains the `.use()` method and the air traffic control. Keeping the chart object in a closure also politely encourages people to access it through plugins rather than directly. (If everything is directly exposed by default, I'm not sure what the advantage is for others to use plugins other than to get the async handling).

To mitigate any sense of paternalism in this strategy, one can pass anonymous functions directly to `.use()` to access chart, or use the `expose` plugin to elevate the chart object to the returned object.
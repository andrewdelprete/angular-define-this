angular-defineThis
=========

A very minimal Angular module that allows you wrap a word in a simple directive and retrieve a definition of it via tooltip. This module uses Google's Define API for definition references.

Created By
----
Andrew Del Prete ([@pathsofdesign])

Version
----

1.0


Dependencies
-----------
* AngularJS
* Twitter Bootstrap UI

Example Use
--------------

Javascript
``` javascript
/* Inject defineThisModule as a dependency */
angular.module('yourModule', ['defineThisModule']);
```

HTML
``` html
What's the definition of <define-this>love</define-this>.
```
Demo
----
[Angular Define This Demo]

License
----

MIT
[AngularJS]:http://angularjs.org/
[Twitter Bootstrap UI]:https://github.com/grevory/angular-local-storage
[@andrewdelprete]:http://www.twitter.com/andrewdelprete
[Angular Define This Demo]:http://andrewdelprete.github.io/angular-define-this/#/

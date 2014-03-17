'use strict';
angular.module('defineThisModule', ['ui.bootstrap'])
    // @TODO - Change this to provider for config nation
    .factory('defineThisFactory', function ($http) {
        var factory = {};

        factory.word = function(word) {
            return $http.jsonp('http://www.google.com/dictionary/json?callback=JSON_CALLBACK&sl=en&tl=en&q=' + word).then(function(results) {
                if (results.data && results.data.primaries) {
                    var definition = results.data;
                    // If there is more than one result, use the second definition.
                    if (definition.primaries[0].entries.length > 1) {
                        return definition.primaries[0].entries[1].terms[0].text;
                        // If not, use the first definition.
                    } else {
                        return definition.primaries[0].entries[0].terms[0].text;
                    }
                } else {
                    return 'Could not find definition';
                }
            }, function() {
                return 'Unable to connect to dictionary, please try again later.';
            });
        };

        return factory;
    })
    .directive('defineThis', function(defineThisFactory) {
        var DefineThis = defineThisFactory;

        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: true,
            link: function(scope, element) {
                scope.word = element.text();
                scope.definition = '';

                DefineThis.word(scope.word).then(function(definition) {
                    scope.definition = definition;
                });
            },
            template: '<a tooltip="{{ definition }}"><span ng-transclude /></a>'
        };
    });
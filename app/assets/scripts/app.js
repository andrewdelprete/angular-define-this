'use strict';

angular.module('defineThisDemoApp', ['defineThisModule'])
    .controller('dtCtrl', function($rootScope, $scope, $compile) {
        var element = document.getElementById('word');
        $scope.word = '';
        $scope.submitted = false;

        $scope.submit = function() {
            element.innerHTML = '<define-this>' + $scope.word + '</define-this>';
            var scope = $rootScope.$new();
            $compile(element)(scope);
            $scope.submitted = true;
        };
    });
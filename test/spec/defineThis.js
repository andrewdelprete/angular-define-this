'use strict';

describe('DefineThis', function() {
    var scope, httpBackend, DefineThis, url, element, definition;

    beforeEach(module('defineThisModule', 'mockedFeed'));

    describe('Factory: defineThisFactory', function () {

        beforeEach(inject(function ($rootScope, $controller, $httpBackend, defineThisFactory, definitionJSON) {
            httpBackend = $httpBackend;
            DefineThis = defineThisFactory;
            definition = definitionJSON;
        }));

        it('Should return JSONP', function() {
            url = 'http://www.google.com/dictionary/json?callback=JSON_CALLBACK&sl=en&tl=en&q=love';

            httpBackend.expectJSONP(url).respond();
            DefineThis.word('love');
            httpBackend.flush();
        });

        it('Should return definition', function() {
            url = 'http://www.google.com/dictionary/json?callback=JSON_CALLBACK&sl=en&tl=en&q=love';

            httpBackend.expectJSONP(url).respond(definition);

            DefineThis.word('love').then(function(d) {
                expect(d).to.equal('An intense feeling of deep affection');
            });

            httpBackend.flush();
        });

        it('Should not return definition', function() {
            url = 'http://www.google.com/dictionary/json?callback=JSON_CALLBACK&sl=en&tl=en&q=NotAWord';

            httpBackend.expectJSONP(url).respond();

            DefineThis.word('NotAWord').then(function(d) {
                expect(d).to.equal('Could not find definition');
            });

            httpBackend.flush();
        });
    });

    describe('Directive: dictionary', function() {

        beforeEach(inject(function($rootScope, $compile) {
            scope = $rootScope.$new();
            element = angular.element("<define-this>love</define-this>");
            $compile(element)(scope);
        }));

        it('Should return the text passed to the element', function() {
            expect(element.scope().word).to.equal('love');
        });
    });
});

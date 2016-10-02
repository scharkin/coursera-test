(function() {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
        .directive('foundItems', FoundItemsDirective);

    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'foundItems.html',
            scope: {
                items: '<',
                title: '@?',
                onRemove: '&'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'list',
            bindToController: true
        };

        return ddo;
    }

    function FoundItemsDirectiveController() {
        var list = this;

        list.isEmpty = function() {
            return list.items && !list.items.length;
        };
    }

    NarrowItDownController.$inject = ['MenuSearchService'];

    function NarrowItDownController(MenuSearchService) {
        var narrowDown = this;

        var makeTitle = function(items) {
            if (items && items.length) {
                return ["Found", items.length, items.length === 1 ? "item" : "items"].join(" ");
            }
        };

        narrowDown.searchItems = function() {
            var promise = MenuSearchService.getMatchedMenuItems(narrowDown.searchTerm);

            promise.then(function(foundItems) {
                narrowDown.found = foundItems.slice(0);
                narrowDown.title = makeTitle(narrowDown.found);
            }).catch(function(error) {
                console.log("Something went terribly wrong. " + error);
            });
        };

        narrowDown.removeItem = function(itemIndex) {
            narrowDown.found.splice(itemIndex, 1);
            narrowDown.title = makeTitle(narrowDown.found);
        };
    }

    MenuSearchService.$inject = ['$http', 'ApiBasePath', '$q']

    function MenuSearchService($http, ApiBasePath, $q) {
        var service = this,
            response;

        service.getMatchedMenuItems = function(searchTerm) {
            if (!searchTerm) { // empty list when no term
                var deferred = $q.defer();
                deferred.resolve([]);
                return deferred.promise;
            }
            if (!response) { // cache response
                response = $http({
                    method: "GET",
                    url: (ApiBasePath + "/menu_items.json")
                });
            }
            return response.then(function(result) {
                // process result and only keep items that match
                var foundItems = result.data.menu_items.filter(function(d) {
                    return d.description.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0;
                });

                // return processed items
                return foundItems;
            });;
        };
    }

})();

(function() {
    'use strict';

    angular.module('data')
        .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
        .service('MenuDataService', MenuDataService);

    MenuDataService.$inject = ['$http', 'ApiBasePath'];

    function MenuDataService($http, ApiBasePath) {
        var service = this,
            categoriesPromise; // cache categoriesPromise

        /**
         * Get all menu categories
         * @returns a promise result
         */
        service.getAllCategories = function() {
            if (!categoriesPromise) {
                categoriesPromise = $http({
                    method: "GET",
                    url: (ApiBasePath + "/categories.json")
                });
            }
            return categoriesPromise;
        };

        /**
         * Get menu items for a category
         * @param categoryShortName
         * @returns a promise result
         */
        service.getItemsForCategory = function(categoryShortName) {
            return $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json"),
                params: {
                    category: categoryShortName
                }
            });
        };
    }

})();

(function() {
    'use strict';

    angular.module('MenuApp')
        .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function RoutesConfig($stateProvider, $urlRouterProvider) {

        // Redirect to home page if no other URL matches
        $urlRouterProvider.otherwise('/');

        // *** Set up UI states ***
        $stateProvider

        // Home page
            .state('home', {
            url: '/',
            templateUrl: 'src/menuapp/templates/home.template.html'
        })

        // categories page
        .state('categories', {
            url: '/categories',
            templateUrl: 'src/menuapp/templates/menuapp-categories.template.html',
            controller: 'CategoriesController as list',
            resolve: {
                categories: ['MenuDataService', function(MenuDataService) {
                    return MenuDataService.getAllCategories();
                }]
            }
        })

        // items page
        .state('items', {
            url: '/items/{categoryId}',
            templateUrl: 'src/menuapp/templates/category-items.template.html',
            controller: "ItemsController as list",
            resolve: {
                items: ['MenuDataService', '$stateParams', function(MenuDataService, $stateParams) {
                    return MenuDataService.getItemsForCategory($stateParams.shortName);
                }]
            }
        });

    }

})();

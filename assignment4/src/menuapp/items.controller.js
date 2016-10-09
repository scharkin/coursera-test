(function () {
    'use strict';

    angular.module('MenuApp')
        .controller('ItemsController', ItemsController);

    ItemsController.$inject = ['$stateParams', 'categories', 'MenuDataService'];
    function ItemsController($stateParams, categories, MenuDataService) {
        var list = this;

        list.category = categories.data[$stateParams.categoryId];

        MenuDataService.getItemsForCategory(list.category.short_name).then(function (response) {
            list.items = response.data.menu_items;
        });
    }

})();

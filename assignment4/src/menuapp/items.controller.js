(function() {
    'use strict';

    angular.module('MenuApp')
        .controller('ItemsController', ItemsController);

    ItemsController.$inject = ['$stateParams', 'items'];

    function ItemsController($stateParams, items) {
        var list = this;

        list.items = items.data;
    }

})();

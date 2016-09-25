(function() {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];

    function ToBuyController(ShoppingListCheckOffService) {
        var toBuy = this;

        toBuy.items = ShoppingListCheckOffService.itemsToBuy;

        toBuy.moveItem = function(itemIndex) {
            ShoppingListCheckOffService.moveItem(itemIndex);
        };
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var alreadyBought = this;
        alreadyBought.items = ShoppingListCheckOffService.itemsAlreadyBought;
    }

    function ShoppingListCheckOffService() {
        var service = this;

        service.itemsToBuy = [
            { name: "apples", quantity: 12 },
            { name: "kiwis", quantity: 14 },
            { name: "peaches", quantity: 8 },
            { name: "pears", quantity: 10 },
            { name: "plums", quantity: 16 }
        ];

        service.itemsAlreadyBought = [];

        service.moveItem = function(itemIndex) {
            var item = service.itemsToBuy.splice(itemIndex, 1)[0];
            service.itemsAlreadyBought.push(item);
        };
    }

})();

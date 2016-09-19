(function() {
    'use strict';

    angular.module('LunchCheck', [])
        .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];

    function LunchCheckController($scope) {
        $scope.menuItems = "";

        $scope.checkItems = function() {
            var size = $scope.menuItems.split(',').map(function(item) {
                return item.trim();
            }).filter(function(d) {
                return d;
            }).length;

            $scope.isSuccess = $scope.isError = false;

            if (!size) {
                $scope.message = "Please enter data first";
            } else if (size <= 3) {
                $scope.message = "Enjoy!";
                $scope.isSuccess = true;
            } else {
                $scope.message = "Too much!";
                $scope.isError = true;
            }
        };
    }

})();

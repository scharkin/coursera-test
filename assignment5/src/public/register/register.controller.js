(function () {
    "use strict";

    angular.module('public')
        .controller('RegisterController', RegisterController);
    RegisterController.$inject = ['MenuService', 'RegisterService'];
    function RegisterController(MenuService, RegisterService) {
        var regCtrl = this;

        regCtrl.check = function () {
            MenuService.getMenuItem(regCtrl.user.favoritedish).then(function (data) {
                regCtrl.dishNok = false;
            }, function () {
                regCtrl.dishNok = true;
            })
        };

        regCtrl.submit = function () {
            MenuService.getMenuItem(regCtrl.user.favoritedish).then(function (data) {
                RegisterService.user = regCtrl.user;
                regCtrl.completed = true;
                regCtrl.dishNok = false;
            }, function () {
                regCtrl.completed = false;
                regCtrl.dishNok = true;
            }).finally(function () {
                regCtrl.submitted = true;
            })
        };
    }

})();

(function () {
    "use strict";

    angular.module('public')
        .controller('InfoController', InfoController);
    InfoController.$inject = ['MenuService', 'RegisterService', 'ApiPath'];
    function InfoController(MenuService, RegisterService, ApiPath) {
        var infoCtrl = this;
        infoCtrl.basePath = ApiPath;
        infoCtrl.user = RegisterService.user;
        if (infoCtrl.user) {
            MenuService.getMenuItem(infoCtrl.user.favoritedish).then(function (data) {
                infoCtrl.favoritedish = data;
            })
        }
    }

})();

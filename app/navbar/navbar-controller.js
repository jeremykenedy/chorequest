(function () {
    'use strict';

    angular.module('app')
        .controller('NavController', NavController);

    NavController.$inject = ['$mdSidenav'];

    function NavController ($mdSidenav) {
        var self = this;
        self.toggleNav = function (menu) {
            $mdSidenav(menu).toggle();
        };
    }

})();

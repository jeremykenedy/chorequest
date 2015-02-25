(function () {
    'use strict';

    angular.module('app', ['site-config'])
        .config(['$routeProvider', '$locationProvider', '$mdThemingProvider', function ($routeProvider, $locationProvider, $mdThemingProvider) {

            $routeProvider
                .when('/', {
                    templateUrl: 'home/home.html',
                    controller: 'HomeCtrl',
                    controllerAs: 'vm',
                    title: 'Chore Quest | Changing the way kids get things done'
                })
                .when('/login', {
                    templateUrl: 'login/login.html',
                    controller: 'LoginController',
                    controllerAs: 'vm',
                    title: 'Login'
                })
                .when('/404', {
                    template: '<h2>Page Not Found</h2>',
                    title: 'Page Not Found'
                })
                .otherwise({
                    redirectTo: '/404'
                });

            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });

        }]);
})();

(function () {
    'use strict';

    angular.module('app', ['ngRoute', 'ngAria', 'ngMaterial', 'ngAnimate', 'ngMessages', 'templates', 'satellizer'])
        .config(['$routeProvider', '$locationProvider', '$authProvider', function ($routeProvider, $locationProvider) {
            $routeProvider
            .when('/', {
                templateUrl: 'home/home.html',
                controller: 'HomeCtrl',
                controllerAs: 'vm',
                title: 'Home'
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

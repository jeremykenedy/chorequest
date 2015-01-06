(function () {
    'use strict';

    angular.module('app', ['ngRoute', 'ngAria', 'ngMaterial', 'ngAnimate', 'templates'])
        .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
            $routeProvider
            .when('/', {
                templateUrl: 'home/home.html',
                controller: 'HomeCtrl',
                controllerAs: 'vm',
                title: 'Home'
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

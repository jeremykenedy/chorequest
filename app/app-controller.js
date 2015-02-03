(function () {
    'use strict';

    angular.module('app')
        .controller('AppController', AppController);

    AppController.$inject = ['$rootScope', '$route', 'CONFIG'];

    function AppController ($rootScope, $route, CONFIG) {
        var self = this;

        // Set the site name
        $rootScope.siteName = CONFIG.siteName;

        $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
            var pageTitle = $route.current.title ? $route.current.title : 'Unknown';
            self.title = pageTitle + ' | ' + CONFIG.siteName;
            $rootScope.pageTitle = pageTitle;
        });
    }

})();

(function () {
    'use strict';

    angular.module('app')
        .controller('AppController', AppController);

    AppController.$inject = ['$rootScope'];

    function AppController ($rootScope) {
        var self = this,
            config = {
                siteName: 'Chore Quest'
            };

        self.title = ($rootScope.pageTitle && config.siteName ? $rootScope.pageTitle + ' | ' + config.siteName : null) || '...';

    }

})();

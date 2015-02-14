(function () {
    'use strict';

    angular.module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$auth'];

    function LoginController ($auth) {
        var self = this;

        self.message = '';

        self.login = function () {
            $auth.login({ username: self.username, password: self.password })
                .then(function () {
                    self.message = 'success';
                })
                .catch(function (response) {
                    if(response.data && response.data.message) {
                        self.message = response.data.message + '!';
                    } else {
                        console.log(response);
                    }
                });
        };
    }
})();

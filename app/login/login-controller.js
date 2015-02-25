(function () {
    'use strict';

    angular.module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$auth', '$mdToast'];

    function LoginController ($auth, $mdToast) {
        var self = this;

        self.message = '';

        self.login = function () {
            $auth.login({ username: self.username, password: self.password })
                .then(function () {
                    self.message = 'success';
                })
                .catch(function (data) {
                    self.loginForm.username.$dirty = true;
                    self.loginForm.username.$invalid = true;
                    self.username = '';
                    self.loginForm.password.$dirty = true;
                    self.loginForm.password.$invalid = true;
                    self.password = '';
                    $mdToast.show(
                      $mdToast.simple()
                        .content('Invalid Credentials')
                        .hideDelay(3000)
                    );
                });
        };
    }
})();

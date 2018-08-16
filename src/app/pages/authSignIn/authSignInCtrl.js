(function () {
    'use strict';

    angular.module('BlurAdmin.pages.authSignIn')
        .controller('authSignInCtrl', authSignInCtrl);

    /** @ngInject */
    function authSignInCtrl($scope, localStorage, $state, $http, toastr) {
        var vm = this;

        vm.login = login;

        let BASE_URL = "http://localhost:9090";

        function login() {
            if (checkLoginParameters(vm.username) && checkLoginParameters(vm.password)) {
                var dadosUser = {
                    user: vm.username,
                    password: vm.password
                };

                $http.post(BASE_URL + "/auth/login", {
                    "username": vm.username,
                    "password": vm.password
                }).then(function (result) {
                    console.log(result.data.data.passphrase);
                    localStorage.setObject('passphrase', dadosUser);

                    $http.post(BASE_URL + "/auth/createToken", {
                        "passPhrase" : result.data.data.passphrase
                    }).then(function (result) {
                        localStorage.setObject('token',  result.data.data.access_token);

                        $state.go('main.dashboard');
                    }, function (error) {
                        console.error(error);
                    });

                }, function (result) {
                    toastr.error(result.data.errors, 'Error');
                    console.log(result.data);
                });
            }
        }

        function checkLoginParameters(data) {
            if (_.isNull(data) || _.isUndefined(data)) {
                console.error("Data is blank!!");
                return false;
            }
            return true;
        }
    }

})();
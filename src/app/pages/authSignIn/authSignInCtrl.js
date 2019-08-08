(function () {
    'use strict';

    angular.module('BlurAdmin.pages.authSignIn')
        .controller('authSignInCtrl', authSignInCtrl);

    /** @ngInject */
    function authSignInCtrl($scope, localStorage, $state, $http, toastr, restService) {
        let vm = this;

        vm.login = login;

        vm.username = "m.karagozgil@gmail.com";
        vm.password = "murat";

        function login() {

            if (true) {
                localStorage.setObject('passphrase', "passphrase");
                localStorage.setObject('token',  "token");
                $state.go('main.dashboard');
            }
            // TODO authentication will be write
            else if (checkLoginParameters(vm.username) && checkLoginParameters(vm.password)) {
                let dadosUser = {
                    user: vm.username,
                    password: vm.password
                };

                restService.login(vm.username, vm.password).then(function (result) {
                    localStorage.setObject('passphrase', dadosUser);

                    restService.createToken(result.passphrase).then(function (result) {
                        localStorage.setObject('token',  result.access_token);

                        $state.go('main.dashboard');
                    }, function (error) {
                        console.error(error);
                    });

                }, function (result) {
                    toastr.error(result, 'Error');
                    console.log(result);
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

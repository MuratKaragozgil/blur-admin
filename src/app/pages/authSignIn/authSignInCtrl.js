(function () {
    'use strict';

    angular.module('BlurAdmin.pages.authSignIn')
        .controller('authSignInCtrl', authSignInCtrl);

    /** @ngInject */
    function authSignInCtrl($scope, localStorage, $state, $http, toastr, restService) {
        var vm = this;

        vm.login = login;

        let BASE_URL = "http://localhost:9090";

        vm.username = "9050745999824";
        vm.password = "murat";

        function login() {
            if (checkLoginParameters(vm.username) && checkLoginParameters(vm.password)) {
                var dadosUser = {
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
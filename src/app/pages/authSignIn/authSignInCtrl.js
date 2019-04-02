(function () {
    'use strict';

    angular.module('BlurAdmin.pages.authSignIn')
        .controller('authSignInCtrl', authSignInCtrl);

    /** @ngInject */
    function authSignInCtrl($scope, localStorage, $state, $http, toastr, restService, sessionStorage) {
        var vm = this;

        vm.login = login;

        vm.username = "905302682487";
        vm.password = "murat";

        function login() {
            if (checkLoginParameters(vm.username) && checkLoginParameters(vm.password)) {
                let dadosUser = {
                    user: vm.username,
                    password: vm.password
                };

                restService.login(vm.username, vm.password).then(function (result) {
                    sessionStorage.set('token', result.data.data.access_token);

                    $state.go('main.dashboard');
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

(function () {
    'use strict';

    angular.module('BlurAdmin.pages.authSignIn')
        .controller('authSignInCtrl', authSignInCtrl);

    /** @ngInject */
    function authSignInCtrl($scope, localStorage, $state, $http) {
        var vm = this;

        vm.logar = logar;

        init();

        function init() {
            localStorage.clear();
        }

        // TODO cors origin problem will be fixed with adding some header
        var config = {
            headers: {
                'Authorization': 'Basic d2VudHdvcnRobWFuOkNoYW5nZV9tZQ==',
                'Accept': 'application/json;odata=verbose',
                "Access-Control-Allow-Origin": "*",
                "X-Testing": "testing"
            }
        };

        $http.post("http://localhost:9090/auth/login", config).then(function (result) {
            console.log(result);
        }, function (result) {
            console.log(result);
        });

        function logar() {
            var dadosUser = {
                user: vm.user,
                passWord: vm.passWord
            };
            localStorage.setObject('dataUser', dadosUser);
            $state.go('main.dashboard');
        }


    }

})();
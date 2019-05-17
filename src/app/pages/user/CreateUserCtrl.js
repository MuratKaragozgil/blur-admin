/**
 * @author Murat Karagözgil
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.user')
        .controller('CreateUserCtrl', CreateUserCtrl);

    /** @ngInject */
    function CreateUserCtrl($scope, $state, restService, toastr) {

        $scope.user = {};

        $scope.save = function () {
          restService.saveUser($scope.user).then(function () {
              toastr.success("Successfully created user!", 'Success');
              $state.go('main.user.list');
          });
        };
    }

})();

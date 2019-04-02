/**
 * @author Murat Karagözgil
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.user')
        .controller('UserListCtrl', UserListCtrl);

    /** @ngInject */
    function UserListCtrl($scope, $filter, editableOptions, editableThemes, $http, sessionStorage, restService, userList) {
        $scope.userTableData = userList.data;
        $scope.userTableDataPageSize = 10;
    }

})();

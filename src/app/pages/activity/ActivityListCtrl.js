/**
 * @author Murat Karagozgil
 * created on 17.05.2019
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.activity')
        .controller('ActivityListCtrl', ActivityListCtrl);

    /** @ngInject */
    function ActivityListCtrl($scope, restService, $state, activityList) {
        console.log("ActivityListCtrl::invoked!");
        $scope.activityTableData = activityList;

        let getAllActivities = function () {
            restService.getAllActivities().then(function (response) {
                $scope.activityTableData = response;
                $scope.bigTotalItems = response.length;
            });
        };

        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };

        $scope.pageChanged = function() {
            console.log('Page changed to: ' + $scope.bigCurrentPage);
        };

        $scope.deleteActivity = function(id, index) {
            restService.deleteActivity(id).then(function (res) {
                if (res.status) {
                    $scope.activityTableData.splice(index, 1);
                }
            });

        };

        $scope.itemsPerPage = 2;
        $scope.maxSize = 5;
        $scope.bigCurrentPage = 1;
        $scope.numPages = 10;

        $scope.articleTableData = [];

        $scope.createArticle = function () {
            $state.go("main.activity.create")
        };
    }
})();

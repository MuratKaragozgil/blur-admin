/**
 * @author Murat Karagozgil
 * created on 17.05.2019
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.siparis')
        .controller('SiparisListCtrl', SiparisListCtrl);

    /** @ngInject */
    function SiparisListCtrl($scope, restService, $state, siparisList) {
        console.log("SiparisListCtrl::invoked!");
        $scope.siparisTableData = siparisList;

        let getAllActivities = function () {
            restService.getAllActivities().then(function (response) {
                $scope.siparisTableData = response;
                $scope.bigTotalItems = response.length;
            });
        };

        $scope.printQrCode = function(item) {

        };

        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };

        $scope.pageChanged = function() {
            console.log('Page changed to: ' + $scope.bigCurrentPage);
        };

        $scope.deleteSiparis = function(id, index) {
            restService.deleteSiparis(id).then(function (res) {
                if (res.status) {
                    $scope.siparisTableData.splice(index, 1);
                }
            });

        };

        $scope.itemsPerPage = 2;
        $scope.maxSize = 5;
        $scope.bigCurrentPage = 1;
        $scope.numPages = 10;

        $scope.articleTableData = [];

        $scope.createArticle = function () {
            $state.go("main.siparis.create")
        };
    }
})();

/**
 * @author Murat Karagozgil
 * created on 17.05.2019
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.siparis')
        .controller('SiparisListCtrl', SiparisListCtrl);

    /** @ngInject */
    function SiparisListCtrl($scope, restService, $state, siparisList, $window) {
        console.log("SiparisListCtrl::invoked!");
        $scope.siparisTableData = siparisList;

        $scope.checkBoxSelected = function(item) {
          if (item.checked) {
              item.checked = false;
          }   else {
              item.checked = true;
          }
        };

        $scope.printAllSelected = function() {
            var idList = [];
            for(let i=0; i< $scope.siparisTableData.length; i++) {
                if ($scope.siparisTableData[i].checked) {
                    idList.push($scope.siparisTableData[i].id);
                }
            }
            $scope.getQrCodeList(idList);

        };

        $scope.getQrCodeList = function(orderIdList) {
            restService.getFileUrl(orderIdList).then(function (res) {
                console.log(res);
                $window.open(res.url, "_blank");
            })
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

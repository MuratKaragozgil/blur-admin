/**
 * @author Murat Karagozgil
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.article')
        .controller('ArticleListCtrl', ArticleListCtrl);

    /** @ngInject */
    function ArticleListCtrl($scope, restService) {

        restService.getAllArticles().then(function (response) {
            console.log(response);
            $scope.articleTableData = response;
            $scope.bigTotalItems = response.length;
        });



        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };

        $scope.pageChanged = function() {
            console.log('Page changed to: ' + $scope.bigCurrentPage);
        };

        $scope.itemsPerPage = 2;
        $scope.maxSize = 5;
        $scope.bigCurrentPage = 1;
        $scope.numPages = 10;

        $scope.articleTableData = [];
    }

})();

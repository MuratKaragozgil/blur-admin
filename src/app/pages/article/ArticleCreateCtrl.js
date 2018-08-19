/**
 * @author Murat Karagozgil
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.article')
        .controller('ArticleCreateCtrl', ArticleCreateCtrl);

    /** @ngInject */
    function ArticleCreateCtrl($scope, restService, $state, constantService, toastr) {
        console.log("ArticleCreate::invoked!");

        $scope.article = {};

        $scope.intervals = constantService.getInterval();

        restService.getAllCatalogCategories().then(function (result) {
            $scope.catalogCategories = result;
        });

        $scope.save = function () {
            restService.saveArticle($scope.article).then(function (result) {
                toastr.success("Article created successfully!", 'Success');
                $state.go('main.article.list');
            }, function (error) {
                console.error(error);
            });
        }
    }

})();

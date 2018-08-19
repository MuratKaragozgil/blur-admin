/**
 * @author Murat Karagozgil
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.article')
        .controller('ArticleCreateCtrl', ArticleCreateCtrl);

    /** @ngInject */
    function ArticleCreateCtrl($scope, restService, $state) {

        console.log("ArticleCreate::invoked!")

    }

})();

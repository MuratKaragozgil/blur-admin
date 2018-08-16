/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function() {
    'use strict';

    angular.module('BlurAdmin.pages.article', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('main.article', {
                url: '/article',
                template: '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
                abstract: true,
                controller: 'ArticleListCtrl',
                title: 'Article',
                sidebarMeta: {
                    icon: 'ion-grid',
                    order: 0,
                },
                authenticate: true
            }).state('main.article.list', {
            url: '/all-articles',
            templateUrl: 'app/pages/article/article-list.html',
            title: 'All Articles',
            sidebarMeta: {
                order: 0,
            },
            authenticate: true
        });

        $urlRouterProvider.when('/main/tables', '/main/tables/basic');
    }

})();
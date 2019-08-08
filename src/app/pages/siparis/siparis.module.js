/**
 * @author Murat Karagözgil
 * created on 17.05.2019
 */
(function() {
    'use strict';

    angular.module('BlurAdmin.pages.siparis', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('main.siparis', {
                url: '/siparis',
                template: '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
                abstract: true,
                controller: 'SiparisCtrl',
                title: 'Siparis',
                sidebarMeta: {
                    icon: 'ion-grid',
                    order: 0,
                },
                authenticate: true
            }).state('main.siparis.list', {
            url: '/all-siparis',
            templateUrl: 'app/pages/siparis/siparis-list.html',
            title: 'Siparisler',
            controller: 'SiparisListCtrl',
            resolve: {
                siparisList: function (restService) {
                    return restService.getAllSiparis();
                }
            },
            sidebarMeta: {
                order: 0,
            },
            authenticate: true
        });

        $urlRouterProvider.when('/main/tables', '/main/tables/basic');
    }

})();

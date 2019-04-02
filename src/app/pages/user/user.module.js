/**
 * @author Murat Karagözgil
 * created on 31.03.2019
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.user', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('main.user', {
                url: '/user',
                template: '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
                abstract: true,
                title: 'User',
                sidebarMeta: {
                    icon: 'ion-grid',
                    order: 0,
                },
                authenticate: true
            }).state('main.user.list', {
            url: '/all-users',
            templateUrl: 'app/pages/user/user-list.html',
            controller: 'UserListCtrl',
            title: 'All Users',
            sidebarMeta: {
                order: 0,
            },
            resolve: {
                userList: function (restService) {
                    return restService.getAllUsers();
                }
            },
            authenticate: true
        });

        $urlRouterProvider.when('/main/tables', '/main/tables/basic');
    }

})();

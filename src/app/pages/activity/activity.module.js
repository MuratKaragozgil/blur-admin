/**
 * @author Murat Karagözgil
 * created on 17.05.2019
 */
(function() {
    'use strict';

    angular.module('BlurAdmin.pages.activity', [])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('main.activity', {
                url: '/activity',
                template: '<ui-view  autoscroll="true" autoscroll-body-top></ui-view>',
                abstract: true,
                controller: 'ActivityCtrl',
                title: 'Activity',
                sidebarMeta: {
                    icon: 'ion-grid',
                    order: 0,
                },
                authenticate: true
            }).state('main.activity.list', {
            url: '/all-activity',
            templateUrl: 'app/pages/activity/activity-list.html',
            title: 'All Activities',
            controller: 'ActivityListCtrl',
            resolve: {
                activityList: function (restService) {
                    return restService.getAllActivities();
                }
            },
            sidebarMeta: {
                order: 0,
            },
            authenticate: true
        }).state('main.activity.create', {
            url: '/create-activity',
            templateUrl: 'app/pages/activity/activity-create.html',
            title: 'Create Activity',
            controller: 'ActivityCreateCtrl',
            authenticate: true
        });

        $urlRouterProvider.when('/main/tables', '/main/tables/basic');
    }

})();

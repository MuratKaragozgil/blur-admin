/**
 * @author Murat Karagozgil
 * created on 17/08/2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services')
        .service('restService', restService);

    /** @ngInject */
    function restService($http, nmUtils, localStorage) {
        console.log("RestService::invoked!");

        let BASE_URL = "http://18.217.232.13";

        function getConfig() {
            let token = localStorage.getObject('token');

            let config = {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json;'
                }
            };

            return config;
        }

        function createToken(passPhrase) {

            let data = {
                "passPhrase": passPhrase
            };

            let httpPromise = $http.post(BASE_URL + "/auth/createToken", data);
            return nmUtils.handleSimpleHttpResponse(httpPromise);
        }

        function login(userName, passWord) {
            let data = {
                "username": userName,
                "password": passWord
            };

            let httpPromise = $http.post(BASE_URL + "/auth/login", data);
            return nmUtils.handleSimpleHttpResponse(httpPromise);
        }

        /**
         *  Article Endpoints
         */

        function getAllArticles() {
            let httpPromise = $http.get(BASE_URL + "/article/getAllArticles", getConfig());
            return nmUtils.handleSimpleHttpResponse(httpPromise);
        }

        function saveArticle(article) {
            let categoryIds = article.categoryIds.map(function (item) {
                return item['id'];
            });

            let data = {
                title: article.title,
                description: article.description,
                author: article.author,
                interval: article.interval.value,
                categoryIds: categoryIds
            };

            let httpPromise = $http.put(BASE_URL + "/article/addNewArticle", data, getConfig());
            return nmUtils.handleSimpleHttpResponse(httpPromise);
        }

        /**
         * Activity Endpoints
         */

        function getAllActivities() {
            let httpPromise = $http.get(BASE_URL + "/catalog/getAllCatalogActivities", getConfig());
            return nmUtils.handleSimpleHttpResponse(httpPromise);
        }

        function deleteActivity(id) {
            let httpPromise = $http.delete(BASE_URL + "/catalog/deleteCatalogActivity/" + id, getConfig());
            return nmUtils.handleSimpleHttpResponse(httpPromise);
        }

        function saveActivity(activity) {
            let categoryIds = activity.categoryIds.map(function (item) {
                return item['id'];
            });

            let data = {
                title: activity.title,
                description: activity.description,
                subTitle: activity.subTitle,
                materials: activity.materials,
                author: activity.author,
                interval: activity.interval,
                categoryIds: categoryIds
            };

            let httpPromise = $http.put(BASE_URL + "/catalog/addNewCatalogActivity", data, getConfig());
            return nmUtils.handleSimpleHttpResponse(httpPromise);
        }

        /**
         * Catalog Endpoints
         */

        function getAllCatalogCategories() {
            let httpPromise = $http.get(BASE_URL + "/catalog/getAllCatalogCategories", getConfig());
            return nmUtils.handleSimpleHttpResponse(httpPromise);
        }

        return {
            createToken,
            login,

            // Article Methods
            getAllArticles,
            saveArticle,

            // Catalog Category Methods
            getAllCatalogCategories,

            // Activity Methods
            getAllActivities,
            deleteActivity,
            saveActivity
        }
    }

})();

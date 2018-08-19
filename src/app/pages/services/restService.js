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

        let BASE_URL = "http://localhost:9090";

        let token = localStorage.getObject('token');

        let config = {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json;'
            }
        };

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
            let httpPromise = $http.get(BASE_URL + "/article/getAllArticles", config);
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

            let httpPromise = $http.put(BASE_URL + "/article/addNewArticle", data, config);
            return nmUtils.handleSimpleHttpResponse(httpPromise);
        }

        /**
         * Catalog Endpoints
         */

        function getAllCatalogCategories() {
            let httpPromise = $http.get(BASE_URL + "/catalog/getAllCatalogCategories", config);
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
        }
    }

})();
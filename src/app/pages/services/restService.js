/**
 * @author Murat Karagozgil
 * created on 17/08/2018
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.services')
        .service('restService', restService);

    /** @ngInject */
    function restService($http, nmUtils) {

        let BASE_URL = "http://localhost:9091";

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

            let httpPromise = $http.post(BASE_URL + "/auth/admin-login", data);
            return nmUtils.handleSimpleHttpResponse(httpPromise);
        }

        return {
            createToken,
            login
        }
    }

})();
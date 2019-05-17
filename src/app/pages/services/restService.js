/**
 * @author Murat Karagozgil
 * created on 17/08/2018
 */
(function () {

    angular.module('BlurAdmin.pages.services')
        .service('restService', restService);

    /** @ngInject */
    function restService($http, nmUtils, sessionStorage) {

        var BASE_URL = "http://localhost:9091";

        function getCurrentConfig() {
            var token = sessionStorage.get('token');

            return {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json;'
                }
            };
        }

        function createToken(passPhrase) {
            var data = {
                "passPhrase": passPhrase
            };

            var httpPromise = $http.post(BASE_URL + "/auth/createToken", data);
            return nmUtils.handleSimpleHttpResponse(httpPromise);
        }

        function login(userName, passWord) {
            var data = {
                "username": userName,
                "password": passWord
            };

            var httpPromise = $http.post(BASE_URL + "/auth/admin-login", data);
            return nmUtils.handleSimpleHttpResponse(httpPromise);
        }

        function getUserObjectIfExists() {
            var username = localStorage.get('username');
            var password = localStorage.get('password');
            return {
                username: username,
                password: password
            }
        }

        function refreshToken() {
            var user = getUserObjectIfExists();
            if (user.username !== undefined && user.password !== undefined) {
                login(user.username, user.password);
            }
        }

        /**
         * User Endpoints
         */

        function getAllUsers() {
            var httpPromise = $http.get(BASE_URL + "/user/get-all-users", getCurrentConfig());
            return nmUtils.handleSimpleHttpResponse(httpPromise);
        }

        function saveUser(user) {
            var httpPromise = $http.post(BASE_URL + "/user/save", user, getCurrentConfig());
            return nmUtils.handleSimpleHttpResponse(httpPromise);
        }

        return {
            createToken,
            refreshToken,
            login,

            saveUser,
            getAllUsers
        }
    }

})();

/**
 * nmUtils - service to ..
 *
 * @author Murat Karagozgil
 */
(function () {
    angular.module('BlurAdmin.pages.services')
        .factory('nmUtils', nmUtils);

    nmUtils.$inject = ['$http', '$q', '$timeout', '$state', 'sessionStorage', 'toastr'];

    function nmUtils($http, $q, $timeout, $state, sessionStorage, toastr) {

        function dateToUTCDate(date) {
            return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        }

        function dateToUTCDateWithMilis(date) {
            return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
        }

        function responseCallback(response) {
            return response;
        }

        function singleFieldResponseCallback(fieldName) {
            return function (response) {
                if (response.data && response.data[fieldName]) {
                    return response.data[fieldName];
                }

                return null;
            };
        }

        function errorCallback(response) {
            if (response.data && response.data.error && response.data.message) {
                toastr.error(response.data.message, 'Error');
                return $q.reject(response.data.message);
            } else if (response.data && response.data.errors && response.data.errors.message) {
                toastr.error(response.data.errors.message, 'Error');
                return $q.reject(response.data.message);
            } else {
                return $q.reject("An unexpected error occurred! Please try again later!");
            }
        }

        function simpleHttpPromiseHandler(httpPromise, responseField) {
            if (responseField) {
                return httpPromise.then(singleFieldResponseCallback(responseField), errorCallback);
            }

            return httpPromise.then(responseCallback, errorCallback);
        }

        function uploadPromiseHandler(uploadPromise) {
            return uploadPromise.then(function (response) {
                return $timeout(angular.noop, 0).then(function () {
                    return response.data;
                });
            }, errorCallback);
        }

        function createCacheListAndMap(list, identifierProperty) {
            var cache = {};
            cache.list = list;
            cache.map = createCacheMap(list, identifierProperty);
            return cache;
        }

        function createCacheMap(list, identifierProperty) {
            var map = {};
            angular.forEach(list, function (item) {
                map[item[identifierProperty]] = item;
            });
            return map;
        }


        return {
            /** HTTP Utils **/
            httpResponseCallback: responseCallback,
            httpErrorCallback: errorCallback,
            handleSimpleHttpResponse: simpleHttpPromiseHandler,
            handleUploadResponse: uploadPromiseHandler,

            /** Data Parsing Utils **/
            createCacheListAndMap: createCacheListAndMap,
            createCacheMap: createCacheMap,

            /**
             * Date converter
             */
            dateToUTCDate: dateToUTCDate,
            dateToUTCDateWithMilis: dateToUTCDateWithMilis

        };
    }
}());

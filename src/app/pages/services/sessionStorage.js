/**
 * @author Murat Karagözgil
 * created on 29/06/2017
 */
(function () {

    angular.module('BlurAdmin.pages.services')
        .service('sessionStorage', sessionStorage);

    /** @ngInject */
    function sessionStorage($window) {
        var sessionStorage = $window.sessionStorage;

        var service = {
            set: set,
            get: get,
            clear: clear
        };

        return service;

        function set(key, value) {
            sessionStorage.setItem(key, value);
        }

        function get(key, defaultValue) {
            return sessionStorage.getItem(key) || defaultValue;
        }

        function clear() {
            sessionStorage.clear();
        }
    }

})();

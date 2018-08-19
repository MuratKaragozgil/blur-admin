/**
 * nmUtils - service to ..
 *
 * @author Murat Karagozgil
 */
(function () {
    angular.module('BlurAdmin.pages.services')
        .factory('constantService', constantService);

    constantService.$inject = [];

    function constantService() {

        let intervalList = [
            {label: "1 Week", value: "1"},
            {label: "2 Week", value: "2"},
            {label: "3 Week", value: "3"},
            {label: "4 Week", value: "4"},
            {label: "5 Week", value: "5"},
            {label: "6 Week", value: "6"},
            {label: "7 Week", value: "7"},
            {label: "8 Week", value: "8"},
            {label: "9 Week", value: "9"},

        ];

        function getInterval() {
            return intervalList;
        }


        return {
            getInterval
        }
    }
}());
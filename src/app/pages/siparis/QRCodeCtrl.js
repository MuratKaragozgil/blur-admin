/**
 * @author Murat Karagozgil
 * created on 17.05.2019
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.siparis')
        .controller('QRCodeCtrl', QRCodeCtrl);

    /** @ngInject */
    function QRCodeCtrl($scope, restService, $state) {
        console.log("QRCodeCtrl::invoked!");


    }
})();

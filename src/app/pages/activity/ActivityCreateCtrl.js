/**
 * @author Murat Karagozgil
 * created on 16.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.activity')
        .controller('ActivityCreateCtrl', ActivityCreateCtrl);

    /** @ngInject */
    function ActivityCreateCtrl($scope, restService, $state, constantService, toastr, $uibModal) {
        console.log("ActivityCreate::invoked!");

        $scope.activity = {
            content: []
        };

        $scope.intervals = constantService.getInterval();

        restService.getAllCatalogCategories().then(function (result) {
            $scope.catalogCategories = result;
        });

        $scope.save = function () {
            restService.saveActivity($scope.activity).then(function (result) {
                toastr.success("Activity created successfully!", 'Success');
                $state.go('main.activity.list');
            }, function (error) {
                console.error(error);
            });
        };


        let ContentDialogController = function ($scope, $uibModalInstance, constantService) {
            let init = function () {
                $scope.content = {
                    type: "TEXT",
                    pos: 0,
                    body: '',
                    textValue: []
                };

                $scope.contentTypes = constantService.getContentTypes();

                $scope.cancel = cancel;
                $scope.save = save;
                $scope.addValueToArray = addValueToArray;
                $scope.contentTypeChanged = contentTypeChanged;
            };

            function cancel() {
                console.log('closing');
                $uibModalInstance.dismiss('dismissed');
            }

            function save() {
                let submitVar = $scope.content;
                console.log('submitting');
                $uibModalInstance.close(submitVar);
            }

            function contentTypeChanged() {
                console.log($scope.content.type);
            }

            function addValueToArray(array, value) {

                if (array.indexOf(value) !== -1) {
                    toastr.warning("Already added same text!", "Warning");
                    return ;
                }

                array.push(value);
                $scope.content.text;
            }

            init();
        };

        $scope.open = function (page, size) {
            let modalInstance = $uibModal.open({
                animation: true,
                templateUrl: page,
                size: size,
                controller: ContentDialogController,
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });

            modalInstance.result.then(function (result) {
                $scope.activity.content.push(result);
            })
        };
    }

})();

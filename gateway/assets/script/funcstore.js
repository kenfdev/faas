var funcStoreModule = angular.module('faasGateway.funcStore', ['ngMaterial']);

funcStoreModule.service('FuncStoreService', ['$http', function ($http) {
    var self = this;
    this.fetchStore = function (url) {
        return $http.get(url)
            .then(function (resp) {
                return resp.data;
            });
    };

}]);

funcStoreModule.component('funcStore', {
    templateUrl: 'funcstore.html',
    bindings: {
        selectedFunc: '<',
        onSelected: '&',
    },
    controller: ['FuncStoreService', '$mdDialog', function FuncStoreController(FuncStoreService, $mdDialog) {
        var self = this;

        this.storeUrl = 'https://raw.githubusercontent.com/kenfdev/sample-func-store/master/store.json';
        this.selectedFunc = null;
        this.functions = [];

        this.select = function (func, event) {
            self.selectedFunc = func;
            self.onSelected()(func, event);
        };

        this.loadStore = function () {
            self.loading = true;
            FuncStoreService.fetchStore(self.storeUrl)
                .then(function (data) {
                    self.loading = false;
                    self.functions = data;
                });
        }

        this.showInfo = function (func, event) {
            $mdDialog.show(
                $mdDialog.alert()
                .multiple(true)
                .parent(angular.element(document.querySelector('#newfunction-dialog')))
                .clickOutsideToClose(true)
                .title(func.title)
                .textContent(func.description)
                .ariaLabel(func.title)
                .ok('OK')
                .targetEvent(event)
            );
        }

        this.loadStore();

    }]
});
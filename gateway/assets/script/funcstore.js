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
        onSelected: '&',
    },
    controller: ['FuncStoreService', function FuncStoreController(FuncStoreService) {
        var self = this;

        this.functions = [];
        this.select = function (func, event) {
            self.onSelected()(func, event);
        }

        var url = 'https://raw.githubusercontent.com/kenfdev/sample-func-store/master/store.json';

        FuncStoreService.fetchStore(url)
            .then(function (data) {
                self.functions = data;
            });

    }]
});
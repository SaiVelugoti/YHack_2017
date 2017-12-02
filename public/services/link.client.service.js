(function ($) {
    angular
        .module('peanut')
        .factory('LinkService', LinkService);

    function LinkService($http) {

        var api ={
            getAccounts : getAccounts,
            getTransactions : getTransactions
        };

        return api;

        function getAccounts(token) {
             var url = '/api/link?public_token='+token;
            //var url  = '/api/link';
            return $http.get(url)
                .then(function (response) {
                    var accounts = response.data;
                    return accounts;
                });
        }
        function getTransactions(token) {
            var url = '/api/transactions/';
            //var url  = '/api/link';
            return $http.get(url)
                .then(function (response) {
                    console.log('jh'+response.data);
                    var accounts = response.data;
                    return accounts;
                });
        }
    }

})();
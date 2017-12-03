(function ($) {
    angular
        .module('peanut')
        .factory('LinkService', LinkService);

    function LinkService($http) {

        var api ={
            getAccounts : getAccounts,
            getTransactions : getTransactions,
            findOverAllAvgExpenses : findOverAllAvgExpenses,
            findSingleAvgExpenses : findSingleAvgExpenses
        };

        return api;

        function getAccounts(token,useremail) {
             var url = '/api/link?public_token='+token+'&useremail='+useremail;
            //var url  = '/api/link';
            return $http.put(url)
                .then(function (response) {
                    console.log(response);
                    var accounts = response;
                    return accounts;
                });
        }
        function getTransactions(useremail) {
            var url = '/api/transactions?useremail='+useremail;
            //var url  = '/api/link';
            return $http.get(url)
                .then(function (response) {
                    return response;
                });
        }

        function findOverAllAvgExpenses() {
            var url = '/api/overallexpenses';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findSingleAvgExpenses(useremail) {
            var url = '/api/singleexpense?useremail='+useremail;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }

})();
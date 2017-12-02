(function ($) {
    angular
        .module('peanut')
        .factory('LinkService', LinkService);

    function LinkService($http) {

        var api ={
            getAccounts : getAccounts
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
    }

})();
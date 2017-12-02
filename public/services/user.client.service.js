(function ($) {
    angular
        .module('peanut')
        .factory('UserService', UserService);

    function UserService($http) {

        var api ={
            login: login
        };

        return api;

        function login(useremail, password) {
            var url = '/api/login?useremail='+useremail+'&password='+password;
            return $http.get(url)
                .then(function (response) {
                    var user = response.data;
                    return user;
                });
        }
    }

})();
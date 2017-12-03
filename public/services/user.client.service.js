(function ($) {
    angular
        .module('peanut')
        .factory('UserService', UserService);

    function UserService($http) {

        var api ={
            login: login,
            register: register
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

        function register(useremail,password,firstname,lastname) {
            var url = '/api/register?useremail='+useremail+'&password='+password+'&firstname='+firstname+'&lastname='+lastname;
            return $http.post(url)
                .then(function (response) {
                    var user = response.data;
                    return user;
                });
        }
    }

})();
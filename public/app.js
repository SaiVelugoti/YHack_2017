(function () {
    angular
        .module('peanut', ['ngRoute'])
        .config(Config);
    function Config($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: './views/login/templates/login.view.client.html',
                controller: 'LoginController',
                controllerAs: 'model'

            })
    }
}) ();
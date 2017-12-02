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
            .when('/link', {
                templateUrl: './views/login/templates/link.view.client.html',
                controller: 'LinkController',
                controllerAs: 'model'

            })
    }
}) ();
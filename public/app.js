(function () {
    angular
        .module('peanut', ['ngRoute','chart.js'])
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: './views/login/templates/login.view.client.html',
                controller: 'LoginController',
                controllerAs: 'model'

            })
            .when('/login', {
                templateUrl: './views/login/templates/login.view.client.html',
                controller: 'LoginController',
                controllerAs: 'model'

            })
            .when('/link/:flag/:useremail', {
                templateUrl: './views/login/templates/link.view.client.html',
                controller: 'LinkController',
                controllerAs: 'model'

            })
            .when('/transactions/:useremail', {
                templateUrl: './views/login/templates/transactions.view.client.html',
                controller: 'TransactionController',
                controllerAs: 'model'

            })
            .when('/register', {
                templateUrl: './views/login/templates/register.view.client.html',
                controller: 'RegisterController',
                controllerAs: 'model'

            })
    }
}) ();
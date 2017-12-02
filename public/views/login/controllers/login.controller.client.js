/**
 * Created by Palaparthi on 11/18/17.
 */
(function () {
    angular
        .module('peanut')
        .controller('LoginController', LoginController);

    function LoginController( $location, $routeParams) {
        var model = this;

        model.login=login;


    function login(username, password) {

            //console.log(searchText);
            if(username==='user123@user.com' && password==='pass123')
            {
                $location.url('/link');
            }
        }
    }


})();

/**
 * Created by Palaparthi on 11/18/17.
 */
(function () {
    angular
        .module('peanut')
        .controller('LoginController', LoginController);

    function LoginController( $location, $routeParams, UserService) {
        var model = this;

        model.login=login;


    function login(useremail, password) {

            //console.log(searchText);
            UserService.login(useremail, password)
                .then(loginUser, loginError);
            /*if(username==='user123@user.com' && password==='pass123')
            {
                $location.url('/link');
            }*/
        }
    function loginUser(user) {
            if(user===null){
                model.message="Wrong credentials";
            }
            else
                $location.url('/link/l/'+user.useremail);
        }
    function loginError(err) {
            model.message = "Something went wrong";
        }
    }


})();

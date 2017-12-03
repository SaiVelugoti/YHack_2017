/**
 * Created by Palaparthi on 11/18/17.
 */
(function () {
    angular
        .module('peanut')
        .controller('RegisterController', RegisterController);

    function RegisterController( $location, $routeParams, UserService) {


        var model = this;

        model.useremail = "";

        model.register1=register1;


        function register1(useremail, password,firstname,lastname) {
            console.log('hai!!');
            console.log(useremail);
            model.useremail = useremail;
            UserService.register(useremail, password,firstname,lastname)
                .then(registerUser, registerError);
        }

        function registerUser(user) {
            if(user===null){
                model.message="Something went wrong!";
            }
            else
                $location.url('/link/r/'+model.useremail);
        }
        function registerError(err) {
            model.message = "Something went wrong!";
        }
    }


})();

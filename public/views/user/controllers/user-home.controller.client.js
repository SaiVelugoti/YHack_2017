/**
 * Created by Palaparthi on 11/18/17.
 */
(function () {
    angular
        .module('HackWIT')
        .controller('UserHomeController', UserHomeController);

    function UserHomeController( $location, $routeParams) {
        var model = this;

        model.redirectToSearchResults=redirectToSearchResults;


    function redirectToSearchResults(searchText) {

        console.log(searchText);
    }
    }


})();

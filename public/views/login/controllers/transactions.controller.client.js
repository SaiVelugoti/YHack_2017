(function () {
    angular
        .module('peanut')
        .controller('TransactionController', TransactionController);

    function TransactionController($location, $routeParams, LinkService) {
        var model = this;

        LinkService.getTransactions().then(render, errorUser);

        function render(data) {
            console.log("In render() controller");
            model.trans=data;
        }
        function errorUser(user) {
            model.message="Oops! Something went wrong :("
        }


    }
})();

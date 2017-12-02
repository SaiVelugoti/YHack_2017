(function () {
    angular
        .module('peanut')
        .controller('LinkController', LinkController);



    function LinkController($location, $routeParams,LinkService) {
        var model = this;

        model.useremail=$routeParams.useremail;
        model.linkAccount=linkAccount;

        function linkAccount() {
            console.log("hello");
            console.log(window.Plaid);
            var handler = window.Plaid.create({
                clientName: 'peanut',
                env: 'sandbox',
                key: 'f504c4778357c1513d4dc0675f5ca9',
                product: ['transactions'],
                onSuccess: function(token, metadata) {

                    LinkService.getAccounts(token,model.useremail);
                    //console.log(model.access_token);
                },
                onExit: function(err, metadata) {
                    if (err != null) {
                        // The user encountered a Plaid API error prior to exiting.
                    }
                    // metadata contains information about the institution
                    // that the user selected and the most recent API request IDs.
                    // Storing this information can be helpful for support.
                }
            });
            handler.open();

        }
    }


})();
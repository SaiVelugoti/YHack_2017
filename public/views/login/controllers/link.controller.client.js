(function () {
    angular
        .module('peanut')
        .controller('LinkController', LinkController);

    function LinkController($location, $routeParams,LinkService, $scope) {
        var model = this;
        model.useremail=$routeParams.useremail;
        model.flag=$routeParams.flag;
        model.diff=[];
        model.dict={};
        model.graph={};
        model.user_values=[];
        model.overall_values=[];
        model.keys=[]

        if(model.flag==='l'){
            LinkService.findOverAllAvgExpenses().then(renderPeers,error);
            LinkService.findSingleAvgExpenses(model.useremail).then(renderUser,error);
        }




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
                    if(model.flag==='r')
                        model.flag='l';
                    LinkService.findOverAllAvgExpenses().then(renderPeers,error);
                    LinkService.findSingleAvgExpenses(model.useremail).then(renderUser,error);

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

        function renderPeers(data){
            model.peers=data;
            console.log(data);

        }

        function renderUser(data) {
            model.useravg=data;
            console.log('user average',data);
            for (i = 0; i < model.peers.length; i++) {
                model.dict[model.peers[i]._id]=model.peers[i].AvgAll;
                model.graph[model.peers[i]._id]=[model.peers[i].AvgAll];
                //model.keys.push(model.peers[i]._id);
                //model.values.push(model.peers[i].AvgAll);
            }
            for (i = 0; i < model.useravg.length; i++){
                if(model.useravg[i]._id in model.dict){
                    model.dict[model.useravg[i]._id]-=model.useravg[i].AvgOne;
                    model.graph[model.useravg[i]._id].push(model.useravg[i].AvgOne);
                }
            }
            //console.log(model.dict);
            //console.log('graph---',model.graph);
            for(var key in model.graph){
                //console.log(model.graph[key]);
                model.keys.push(key);
                model.user_values.push(model.graph[key][1]);
                model.overall_values.push(model.graph[key][0]);
            }
            console.log(model.user_values,model.overall_values,model.keys);
            $scope.labels = model.keys;
            $scope.series = ['My peers', 'Me'];
            $scope.data = [
                model.overall_values,
                model.user_values
            ];
        }

        function error(err) {
            console.log(err);
        }
    }


})();
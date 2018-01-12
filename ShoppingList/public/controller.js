var app = angular.module('shopeasy',[]);
app.controller('main', function($scope, $http){
    
    // Variables:

    // HTTP requests:
    $http.get('/shopeasy').then(
        function(response){
            $scope.message=response.data;
        }, 
        function(response){
            console.log(response.data);
        }
    );
    $scope.insert = function(){
        var newItem = {
            id:3,
            name:"Eggs",
            quantity:2,
            shop:"Walmart"
        };
        $http.post('/shopeasy',newItem).then(
            function(response){
                $scope.message=response.data;
            }, 
            function(response){
                console.log(response.data);
            }
        );
    }
});
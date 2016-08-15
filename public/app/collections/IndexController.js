(function(){
    angular.module('dataviz').controller('CollectionsIndexController', ['$scope', '$http',
    function($scope, $http){
        $scope.collections = [];
        $scope.getCollections = getCollections;

        getCollections();        

        function getCollections(){
            $http.get('/collections')
            .then(function(res){
                $scope.collections = res.data;
            }, function(err){
                console.err(err);
            
            });
        }
        
    }]);
})();
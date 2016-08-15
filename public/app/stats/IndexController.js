(function(){
    angular.module('dataviz').controller('StatsController', ['$scope', '$http','$stateParams',
    function($scope, $http, $stateParams){
        $scope.collection = null;
        $scope.getCollection = getCollection;

        getCollection();        

        function getCollection(){
            var id = $stateParams.collectionId;
            $http.get('/collections/' + id)
            .then(function(res){
                $scope.collection = res.data;
                $scope.series = [$scope.collection.name];
                $scope.data = [ $scope.collection.data ];
            }, function(err){
                console.err(err);
            
            });
        }
        
    }]);
})();
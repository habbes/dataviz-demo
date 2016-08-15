(function(){
    'use strict';

    angular.module('dataviz').controller('CollectionsNewController', ['$scope', 'Upload', '$state',
    function($scope, Upload, $state){

        $scope.saveCollection = function(data){
            console.log(data);
            var upload = Upload.upload({
                url: '/collections/',
                data: data
            })
            .then(function(res){
                var col = res.data;
                $state.go('collections');
            }, function(res){
                console.log('err', res);
            });
            
        };

    }]);
})();
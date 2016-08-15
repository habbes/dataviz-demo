(function(){
    'use strict';

    angular.module('dataviz')
    .config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('/');

        $stateProvider
        .state('collections', {
            url: '/',
            templateUrl: 'app/collections/index.html'
        })
        .state('newCollection', {
            url: '/new',
            templateUrl: 'app/collections/new.html'
        })
        .state('stats', {
            url: '/stats/:collectionId',
            templateUrl: 'app/stats/index.html'
        })
        ;

    }]); 

})();
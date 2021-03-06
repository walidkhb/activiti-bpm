(function() {
'use strict';

angular
    .module('bpm_app')
    .config(stateConfig);

    stateConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function stateConfig($stateProvider, $urlRouterProvider) {

         $stateProvider
           .state('process', {
                   url: '/process/:type',
                   views: {
                       'content@': {
                           templateUrl: 'activiti-process/process.html',
                           controller: 'ProcessController'
                       },
                       'navbar':{
                           templateUrl: 'navbar/navbar.html',
                           controller: 'NavbarController'
                       }
                   }
               })
    }

 })();
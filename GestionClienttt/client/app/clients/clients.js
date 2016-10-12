'use strict';

angular.module('myAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('clients', {
        url: '/clients',
        templateUrl: 'app/clients/clients.html',
        controller: 'ClientsCtrl'
      });
  });
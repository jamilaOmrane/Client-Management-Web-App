'use strict';

angular.module('myAppApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    },
    {
      'title': 'Clients',
      'link': '/clients',
      'children': [{
        'title': 'Add',
        'link': '/clients#addClient'
      }]
    },
    {
      'title': 'Projcts',
      'link': '/projects',
      'children': [{
        'title': 'Add',
        'link': '/projects/addProject'
      }]
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
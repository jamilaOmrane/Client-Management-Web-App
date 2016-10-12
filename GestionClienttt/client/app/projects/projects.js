'use strict';

angular.module('myAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('projects', {
        url: '/projects',
        templateUrl: 'app/projects/projects.html',
        controller: 'ProjectsCtrl'
      })
      .state('addProject', {
      	url: '/projects/addProject',
      	templateUrl: 'app/projects/addProject.html',
      	controller: 'ProjectsCtrl'
      })
      .state('updateProject',{
        url: '/projects/updateProject',
        templateUrl: 'app/projects/updateProject.html',
        controller: 'UpdateProjectCtrl'
      });
  });
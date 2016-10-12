'use strict';

angular.module('myAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('tasks', {
        url: '/tasks',
        templateUrl: 'app/tasks/tasks.html',
        controller: 'TasksCtrl'
      })

       .state('addTask', {
      	url: '/tasks/addTask',
      	templateUrl: 'app/tasks/addTask.html',
      	controller: 'TasksCtrl'
      })

       .state('updateTask', {
        url: '/tasks/updateTask',
        templateUrl: 'app/tasks/updateTask.html',
        controller: 'UpdateTasksCtrl'
      })
       ;
  });
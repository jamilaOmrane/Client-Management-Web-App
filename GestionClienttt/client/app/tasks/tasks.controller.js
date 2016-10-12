'use strict';

angular.module('myAppApp')

	.factory("ProjectToTask",function(){
	var projectId;

     return {
            setData: function(data) {
            	projectId=data._id;
            },
            getData: function() {
               return projectId;
            }
     };
   })

	.factory("TaskToUpdate",function(){
	var task= {};

     return {
            setData: function(data) {
            	task._id=data._id;
            	task.name=data.name;
            	task.description=data.description;
            	task.info=data.info;
            	task.status=data.status;
            	task.startDatePrevision=data.startDatePrevision;
            	task.endDatePrevision=data.endDatePrevision;
            	task.project=data.project;
            },
            getData: function() {
               return task;
            }
     };
   })

  .controller('TasksCtrl', function ($scope, $http, $location, SelectedProjectService, ProjectToTask, TaskToUpdate) {
  //$scope.finishDateValidity=true;
  var projectId;
  $scope.selectedProject=SelectedProjectService.getData();
  console.log("mel controlleur");
  console.log($scope.selectedProject);
    $http.get('/api/clients/'+$scope.selectedProject.client)
            .success(function(data){
            $scope.clientFullname=data.firstName+" "+data.lastName;
            })
            .error(function(err){
              alert('Error! Something went wrong');
            });

  	$http.get('/api/tasks')
  .success(function(data){
  		$scope.showButton=false;
  		projectId=$scope.selectedProject._id;
  		$scope.projectTasks=[];
       angular.forEach(data, function(value,key){
       	
       		if(angular.equals(value.project, projectId)){
       			console.log(value);
       			$scope.projectTasks.push(value);
       		}
       	})
    	})
    .error(function(err){
      alert('Error');
    });

    var today=new Date();
    $scope.today = today.toISOString();
    console.log($scope.today);

   $scope.goToTask=function(){
   	console.log($scope.selectedProject);
    ProjectToTask.setData($scope.selectedProject);
    $location.path('/tasks/addTask');
  	
  };

 $scope.addNewTask=function(){
 /* if($scope.newTask.endDatePrevision>=$scope.newTask.startDatePrevision){
    $scope.finishDateValidity=true;*/
    $scope.newTask.project=ProjectToTask.getData();
    console.log($scope.newTask.project);
     $http.post('/api/tasks', $scope.newTask)
      .success(function(){
        //$scope.newTask = {};
          //$scope.myForm.$setPristine();
          $location.path('/tasks');
        })
        .error(function(err){
          alert('Error! Something went wrong');
        }); 
  /*}else{
    $scope.finishDateValidity=false;
    $scope.myForm.$setPristine();
  } 
     */
 	 
  };

  $scope.showButtonToggle=function(){
  	if($scope.showButton){
  		$scope.showButton=false;
  	}else{
  		$scope.showButton=true;
  	}
  };

  $scope.removeTask=function(index){
  	 if (confirm('Are you sure you want to delete this?')) {
      $http.delete('/api/tasks/' + $scope.projectTasks[index]._id)
      .success(function(){
        $scope.projectTasks.splice(index, 1);
      })
      .error(function(err){
        alert('Error! Something went wrong');
      });
    };
    
  };

  $scope.editTask=function(index){
    console.log($scope.projectTasks[index]);
  		TaskToUpdate.setData($scope.projectTasks[index]);
		console.log(TaskToUpdate.getData());
		$location.path('/tasks/updateTask');
  };

  $scope.goToUpdateProject=function(){
    SelectedProjectService.setData($scope.selectedProject);
    $location.path('/projects/updateProject');
  }

  $scope.deleteProject=function(){
    $http.get('/api/tasks')
    .success(function(data){
     var nombreTask=0;
       angular.forEach(data, function(value,key){
        
          if(angular.equals(value.project, projectId)){
            nombreTask ++;
          }
        })
       if ((nombreTask==0)&&(confirm('Are you sure you want to delete this?'))) {
          $http.delete('/api/projects/' + projectId)
          .success(function(){
            $location.path('/projects');
          })
          .error(function(err){
            alert('Error! Something went wrong');
          });
          }else{ if(nombreTask!=0){
            window.alert("Impossible de supprimer ce projet en effet il est concerné par des taches");
          }
          }   
      })
    .error(function(err){
      alert('Error');
    });
  }


  })


  .controller('UpdateTasksCtrl', function ($scope, $http, $location, TaskToUpdate, SelectedProjectService) {
  	$scope.selectedTask=TaskToUpdate.getData();
  	$scope.focusStart=false;
  	$scope.focusfinish=false;


  	$scope.Cancel=function(){
  		$http.get('/api/projects/'+$scope.selectedTask.project)
            .success(function(data){
            console.log(data);
            SelectedProjectService.setData(data);
  			$location.path('/tasks');
            })
            .error(function(err){
              alert('Error! Something went wrong');
            });
  		
  	};

  	$scope.updateTask=function(){
  		$scope.task.project=$scope.selectedTask.project;
  		 $http.put('/api/tasks/' + $scope.selectedTask._id, $scope.task)
            .success(function(data){
            $http.get('/api/projects/'+$scope.selectedTask.project)
            .success(function(data){
            console.log(data);
            SelectedProjectService.setData(data);
  			$location.path('/tasks');
            })
            .error(function(err){
              alert('Error! Something went wrong');
            });
            })
            .error(function(err){
              alert('Error! Something went wrong');
            });
  	};
  
  });

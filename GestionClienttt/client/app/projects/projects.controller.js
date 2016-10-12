'use strict';

angular.module('myAppApp')


.factory("SelectedProjectService",function(){
	var dataObj = {};

     return {
            setData: function(data) {
              dataObj._id=data._id,
               dataObj.title= data.title,
               dataObj.description = data.description,
               dataObj.date = data.date,
               dataObj.status = data.status,
               dataObj.deadline = data.deadline,
               dataObj.client = data.client;

            },
            getData: function() {
               return dataObj;
            }
     };
})

  .controller('ProjectsCtrl', function ($document, $scope, $http,$window, $location, SelectedProjectService) {
  $scope.fullnames=[];
  $scope.clientIds=[];
  	$http.get('/api/projects')
  	.success(function(data){
      $scope.projects = data;
      console.log($scope.projects);
      angular.forEach($scope.projects, function(value,key){
              $scope.clientIds.push(value.client);
              console.log(value.title);
              console.log(value.client);
      })
      angular.forEach($scope.clientIds, function(value,key)
      {
          $http.get('/api/clients/' +value)
            .success(function(data){
              console.log("wosst http.get")
            var fullname =data.firstName+" "+data.lastName;
            $scope.fullnames.push(fullname);
            console.log(fullname);
            })
            .error(function(err){
              alert('Error! Something went wrong');
            });

      })
           /* $http.get('/api/clients/' +value.client)
            .success(function(data){
              console.log("wosst http.get")
              console.log(value.title);
            var fullname =data.firstName+" "+data.lastName;
            $scope.fullnames.push(fullname);
            console.log(fullname);
            })
            .error(function(err){
              alert('Error! Something went wrong');
            });*/
    
    })
    .error(function(err){
      alert('Error');
    });

    $http.get('/api/clients')
  .success(function(data){
      $scope.clients = data;
      console.log($scope.clients);
    })
    .error(function(err){
      alert('Error');
    });


    var today=new Date();
    $scope.today = today.toISOString();
    console.log($scope.today);




 $scope.addNewProject=function(){
 	console.log("hedha lmodel");
 	console.log($scope.newProject.client);
 	//$scope.newProject.client=$scope.client._id;	
 	////manajamtech nricuperi l'id 
 	//console.log("hedha l'id");
 	//console.log($scope.client._id);
 	
   $http.post('/api/projects', $scope.newProject)
    .success(function(){
        $scope.projects.push($scope.newProject);
        $scope.newProject = {};
        $scope.myForm.$setPristine();

      })
      .error(function(err){
        alert('Error! Something went wrong');
      });  
  };


  $scope.getDetails=function(index){
  	$http.get('/api/projects/' +$scope.projects[index]._id)
  	.success(function(data){
		SelectedProjectService.setData(data);
		console.log(SelectedProjectService.getData());
		$location.path('/tasks');
		

  	})
  	.error(function(err){
  		alert('Error! Something went wrong');
  	});
};
})

 .controller('UpdateProjectCtrl', function ($document, $scope, $http ,$window, $location, SelectedProjectService) {
  $scope.showTextClient=true;
  $scope.showTextDate=true;
  $scope.projectToUpdate=SelectedProjectService.getData();
  console.log($scope.projectToUpdate);
  $http.get('/api/clients')
  .success(function(data){
      $scope.clients = data;
      console.log($scope.clients);
    })
    .error(function(err){
      alert('Error');
    });

    $scope.Cancel=function(){
        $location.path('/projects');
            };

  $scope.updateProject=function(){
    $scope.updatedProject.status=$scope.projectToUpdate.status;
    $scope.updatedProject.date=$scope.projectToUpdate.date;
    console.log($scope.updatedProject);
    $http.put('/api/projects/' + $scope.projectToUpdate._id, $scope.updatedProject)
      .success(function(){
        $location.path('/projects');
      })
      .error(function(err){
        alert('Error! Something went wrong');
      });
  }
});




'use strict';




var clt =angular.module('myAppApp');

clt.controller('ClientsCtrl', ['$scope', '$http', '$window', function($scope,$http,$window) {
  $scope.showButtons=false;
  $http.get('/api/clients')
  .success(function(data){
      $scope.clients = data;
      console.log($scope.clients);
    })
    .error(function(err){
      alert('Error');
    });


  $scope.addNewClient=function(){
      console.log('hii from controller');
    $http.post('/api/clients', $scope.newClient)
    .success(function(){
        $window.location.reload();
      })
      .error(function(err){
        alert('Error! Something went wrong');
      });   
  };

  $scope.deleteClient = function(index){
    var nombreProjet=0;

    $http.get('/api/projects')
    .success(function(data){
      angular.forEach(data, function(value,key){
        if(value.client==$scope.clients[index]._id){
          nombreProjet++;
        }
      })
      console.log(nombreProjet);
          if ((nombreProjet==0)&&(confirm('Are you sure you want to delete this?'))) {
          $http.delete('/api/clients/' + $scope.clients[index]._id)
          .success(function(){
            $scope.clients.splice(index, 1);
          })
          .error(function(err){
            alert('Error! Something went wrong');
          });
          }else{ if(nombreProjet!=0){
            window.alert("Impossible de supprimer ce client en effet il est concerné par des projets");
          }
          }   
    })
    .error(function(err){
      alert('Error');
    });    
  };

  $scope.updateClient = function(index){
    console.log($scope.clients[index]._id);
        $http.put('/api/clients/' + $scope.clients[index]._id, $scope.clients[index])
      .success(function(){
        $window.location.reload();
      })
      .error(function(err){
        alert('Error! Something went wrong');
      });
  }

  $scope.updateClientCancel = function(){
    $window.location.reload();
  };

}]);


var app=angular.module('view',[]);

app.controller('viewCtrl',function($scope,$http){
    $scope.data={}
    $scope.response = {}
    $scope.viewAll=function()
    {
       $http.get("/api/view").then(function (response) {
           $scope.response = response;
      });
    };
    $scope.viewId=function()
    {
       $http.get("/api/view?id="+$scope.data.id).then(function (response) {
           $scope.response = response;
      });
    };
    $scope.viewCity=function()
    {
       $http.get("/api/view?name="+$scope.data.name).then(function (response) {
           $scope.response = response;
      });
    };
});
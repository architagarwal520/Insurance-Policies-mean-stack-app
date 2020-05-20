var app=angular.module('delete',[]);

app.controller('deleteCtrl',function($scope,$http){
    $scope.data={};
    $scope.response = "";
    $scope.delete=function()
    {
        $http.delete("/api/delete?id="+$scope.data.id).then((response)=>{
            $scope.response = response;
         });
    };
});
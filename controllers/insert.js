var app=angular.module('insert',[]);

app.controller('insertCtrl',function($scope,$http){
    $scope.data = {};
    $scope.data.list=[];
    $scope.item={};
    $scope.response = "";	
    $scope.add=function()
    {
       var obj={
                 "type":$scope.item.type,
                 "comp":$scope.item.comp,
                 "term":$scope.item.term
               };
       $scope.data.list.push(obj); 
       $scope.item={};
    };
    $scope.insert = function() 
    {        
        $http.post("/api/insert", JSON.stringify($scope.data)).then((response)=>{
            $scope.response = response;
        });
    };
});

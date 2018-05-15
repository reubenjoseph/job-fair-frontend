/** *************Angular controller JS*********************/
var app = angular.module('jobfair', []);

app.controller('regController', ['$scope', '$http', function($scope, $http) {

    $scope.angTest = function() {
        console.log('NGWORK');
    };

    $scope.register = function() {
        console.log("ANGULAR");
        var url = 'http://139.59.79.82:3030/register';
        console.log($scope.data);
        // $http.post(url, $scope.data).then(function(success) {
        //     var resp = success.data;
        //     // console.log(resp);
        //     $scope.status = resp.msg;
        //     alert(resp.msg);
        //     $scope.data = {};
        // }, function(err) {
        //     // console.log(err);
        // });
    };

}]);
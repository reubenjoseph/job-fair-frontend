/** *************Angular controller JS*********************/
var app = angular.module('jobfair', []);

app.controller('regController', ['$scope', '$http', '$window', function($scope, $http, $window) {


    $scope.register = function() {
        var url = 'http://localhost:3030/register';
        $http.post(url, $scope.data).then(function(success) {
            var resp = success.data;
            // console.log(resp);
            $scope.status = resp.msg;
            alert(resp.msg);
            $scope.data = {};
        }, function(err) {
            // console.log(err);
        });
    };

    $scope.loginFn = function() {
        var url = 'http://localhost:3030/login';
        $http.post(url, $scope.data.login).then(function(success) {
            var resp = success.data;
            $scope.status = resp.msg;
            if (resp.success) {
                alert("Your user ID is : " + resp.user + ". Dashboard will be updated soon!");
                // $window.location.href = './loginpage.html';
            } else {
                alert('Login Failed : ' + resp.msg);
            }
            $scope.login = {};
        }, function(err) {
            // console.log(err);
        });
    };

    $scope.updateNonIEEE = function() {
        var url = 'http://localhost:3030/nonmemberupdate';
        $http.post(url, $scope.data.upd).then(function(success) {
            var resp = success.data;
            $scope.status = resp.msg;
            console.log(resp);
            alert(resp.msg);
            $scope.upd = {};
        }, function(err) {
            // console.log(err);
        });
    };

}]);
/** *************Angular controller JS*********************/
var app = angular.module('jobfair', []);

app.controller('regController', ['$scope', '$http', '$window', function($scope, $http, $window) {

    var host = 'http://34.242.23.100:3030'
    $scope.register = function() {
        var url = host + '/register';
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
        var url = host + '/login';
        $http.post(url, $scope.data.login).then(function(success) {
            var resp = success.data;
            $scope.status = resp.msg;
            if (resp.success) {
                alert("Your user ID is : " + resp.user + ".Please note this ID down for future use.Dashboard will be updated soon!.All communications will be made temporarily though email.");
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
        var url = host + '/nonmemberupdate';
        $http.post(url, $scope.data.upd).then(function(success) {
            // console.log(resp.data);
            var resp = success.data;
            $scope.status = resp.msg;
            alert(resp.msg);
            $scope.upd = {};
        }, function(err) {
            // console.log(err);
        });
    };

}]);
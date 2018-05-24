/** *************Angular controller JS*********************/
var app = angular.module('jobfair', ['ngStorage']);

app.controller('regController', ['$scope', '$http', '$window', '$localStorage', function($scope, $http, $window, $localStorage) {

    var host = 'http://34.242.23.100:3030'
        // var host = 'http://localhost:3030'

    var test = "FILE UPDATED";
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
                $localStorage.token = resp.token;
                $localStorage.user = resp.user;
                $window.location.href = './loginpage.html';
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

    $scope.updateVenues = function() {
        var url = host + '/venuechange';
        $http.post(url, $scope.data.venue).then(function(success) {
            // console.log(resp.data);
            var resp = success.data;
            $scope.status = resp.msg;
            alert(resp.msg);
            $scope.venue = {};
        }, function(err) {
            // console.log(err);
        });
    };

    // $scope.getHallTicket = function() {
    //     var url = host + '/getHallTicket';
    //     $http.post(url, $scope.data.admit, { responseType: 'arraybuffer' }).then(function(success) {
    //         var resp = success.data;
    //         console.log(resp);
    //         if (resp.success != null) {
    //             $scope.status = resp.msg;
    //             alert(resp.msg);
    //             $scope.admit = {};
    //         } else {
    //             var file = new Blob([resp], { type: 'application/pdf' });
    //             var fileURL = URL.createObjectURL(file);
    //             $window.open(fileURL);
    //         }

    //     }, function(err) {
    //         // console.log(err);
    //     });
    // };

}]);

app.controller('loginController', ['$scope', '$http', '$window', '$localStorage', function($scope, $http, $window, $localStorage) {
    $scope.user = $localStorage.user;

    if ($localStorage.token == null) {
        $window.location.href = 'index.html';
    }
    $scope.logout = function() {
        $localStorage.$reset();
        $window.location.href = './index.html';
    }

    $scope.download = function() {
        var host = 'http://34.242.23.100:3030'
        var url = host + '/admitCard';
        $http.post(url, { token: $localStorage.token }, { responseType: 'arraybuffer' }).then(function(success) {
            var resp = success.data;
            console.log(resp);
            if (resp.success != null) {
                $scope.status = resp.msg;
                alert(resp.msg);
                $scope.admit = {};
            } else {
                var file = new Blob([resp], { type: 'application/pdf' });
                var fileURL = URL.createObjectURL(file);
                $window.open(fileURL);
            }

        }, function(err) {
            // console.log(err);
        });
    }

}]);
/** *************Angular controller JS*********************/
var app = angular.module('jobfair', ['ngStorage']);

app.controller('regController', ['$scope', '$http', '$window', '$localStorage', function($scope, $http, $window, $localStorage) {
    var host = 'http://34.242.23.100:3030'

    app.directive('file', function() {
        return {
            scope: {
                file: '='
            },
            link: function(scope, el, attrs) {
                el.bind('change', function(event) {
                    var file = event.target.files[0];
                    scope.file = file ? file : undefined;
                    scope.$apply();
                });
            }
        };
    });

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
                $localStorage.res_stat = resp.resume;
                $window.location.href = './loginpage.html';
            } else {
                alert('Login Failed : ' + resp.msg);
            }
            $scope.login = {};
        }, function(err) {
            // console.log(err);
        });
    };

    // $scope.updateNonIEEE = function() {
    //     var url = host + '/nonmemberupdate';
    //     $http.post(url, $scope.data.upd).then(function(success) {
    //         // console.log(resp.data);
    //         var resp = success.data;
    //         $scope.status = resp.msg;
    //         alert(resp.msg);
    //         $scope.upd = {};
    //     }, function(err) {
    //         // console.log(err);
    //     });
    // };

    // $scope.updateVenues = function() {
    //     var url = host + '/venuechange';
    //     $http.post(url, $scope.data.venue).then(function(success) {
    //         // console.log(resp.data);
    //         var resp = success.data;
    //         $scope.status = resp.msg;
    //         alert(resp.msg);
    //         $scope.venue = {};
    //     }, function(err) {
    //         // console.log(err);
    //     });
    // };

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

    function getStat(val) {
        if (val == 0)
            return "FILE NOT UPLOADED";
        else
            return "FILE Uploaded Successfully";
    }

    $scope.user = $localStorage.user;
    $scope.res = false;
    $scope.res_stat = getStat($localStorage.res_stat);

    // var host = 'http://34.242.23.100:3030'
    var host = 'http://localhost:3030'

    if ($localStorage.token == null) {
        $window.location.href = 'index.html';
    }

    $scope.logout = function() {
        $localStorage.$reset();
        $window.location.href = './index.html';
    };

    $scope.uploadFile = function(files) {
        var fd = new FormData();
        // //Take the first selected file
        fd.append("token", $localStorage.token);
        fd.append("file", files[0], $localStorage.user);
        var url = host + '/uploadResume';
        // var obj = { 'token': $localStorage.token, 'file': fd };

        $http({
            url: url,
            method: 'POST',
            data: fd,
            withCredentials: true,
            headers: { 'Content-Type': undefined },
            transformRequest: angular.identity
        }).then(function(success) {
            if (success.data.success == true) {
                $window.location.reload();
                alert(success.data.data);
                $localStorage.res_stat = 1;
                $scope.res_stat = getStat($localStorage.res_stat);
            } else {
                alert(success.data.data);
            }
        }, function(error) {
            alert('Unexpected Error. Contact Admin');
        });

    };

    $scope.result = function() {
        var url = host + '/result';
        $http.post(url, { "token": $localStorage.token }).then(function(success) {
            // console.log(resp.data);
            var resp = success.data;
            if (resp.success) {
                $scope.apti = resp.data.aptitude;
                $scope.tech = resp.data.technical;
                $scope.logic = resp.data.logical;
                $scope.total = $scope.apti + $scope.tech + $scope.logic;
                $scope.res = true;
            } else {
                alert('You have not attended the test. You cannot sit for the interview.');
            }
        }, function(err) {
            // console.log(err);
        });
    };

    $scope.download = function() {
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
    };

    function getSelectedComp(company_list)
    {
        var url = host + '/getSelectedCompanies';
        $http.post(url, { "token": $localStorage.token }).then(function(success) {
            $scope.choice_list = success.data;
            // console.log($scope.choice_list);
            for(var i = 0; i < company_list.length; i++)
            {
                if($scope.choice_list.indexOf(company_list[i].company_id) > -1)
                {
                    company_list[i].status = "Selected";
                }
                else
                {
                    company_list[i].status = "Not Selected";
                }
            }
            $scope.company_list = company_list;
            return;
        }, function(err) {
            // console.log(err);
        });
    }

    function allCompanies()
    {
        $http.get(host+'/allCompanies').then(function(success){
            $scope.total_companies = success.data;
        },function(err)
        {
            
        });
    }

    $scope.getPossibleComp = function(){
        var url = host + '/getPossibleCompanies';
        allCompanies();
        $http.post(url, { "token": $localStorage.token }).then(function(success) {
            var resp = success.data;
            if (resp.success) {
                var temp = resp.data;
                getSelectedComp(temp);
            } else {
                alert('You have not attended the test. You cannot sit for the interview.');
            }
        }, function(err) {
            // console.log(err);
        });
    };
    
    $scope.companyUpdate = function(company,ch)
    {
        var url = host + '/companyUpdate';
        if(ch == '1' && $scope.choice_list.length == 5)
        {
            alert('You cannot choose more companies');
            return;
        }
        $http.post(url, { "token": $localStorage.token , "company_id":company.company_id, "choice":ch-'0'}).then(function(success) {
            var resp = success.data;
            getSelectedComp($scope.company_list);
            alert(resp.data);
        }, function(err) {
            // console.log(err);
        });
    };



}]);
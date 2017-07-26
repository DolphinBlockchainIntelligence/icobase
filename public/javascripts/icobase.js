angular.module('icoFormApp', [])
    .controller('Form', ['$scope', '$window', '$location', '$http', function($scope, $window, $location, $http){
        $scope.form = {links: [], sales: []};

        console.log(JSON.stringify($location.$$url));
        if ($location.$$url) {
            console.log($location.$$url);
            $http.get('/form' + $location.$$url)
                .success(function(data){
                    $scope.form = data;
                    $scope.activeSale = $scope.activeSale ? $scope.activeSale : 0;
                });
        }

        $scope.addLink = function() {
            $scope.form.links.push({});
        };

        $scope.delLink = function(idx) {
            $scope.form.links.splice(idx, 1);
        };

        $scope.addSale = function() {
            $scope.form.sales.push({});
            $scope.activeSale = $scope.form.sales.length - 1;
        };

        $scope.selSale = function(idx) {
            $scope.activeSale = idx;
        };

        $scope.delSale = function() {
            $scope.form.sales.splice($scope.activeSale, 1);
            if ($scope.activeSale > 0) {
                $scope.activeSale --;
            }else if(!!$scope.form.sales.lenght) {
                $scope.activeSale = 0;
            }
        };

        $scope.save = function() {
            $http.post('/form', $scope.form)
                .success(function(data){
                    $window.location.href = '/';
                    //$scope.form = data;
                    //$scope.activeSale = $scope.activeSale ? $scope.activeSale : 0;
                });
            console.log(JSON.stringify($scope.form));
        };

        $scope.cancel = function() {
            $window.location.href = '/';
        }
    }])

    .controller('Index', ['$scope', '$window', function($scope, $window){
        $scope.showForm = function (idx) {
            console.log(idx);
            $window.location.href = idx ? '/form/#'+idx : '/form/';
        }
    }])
;

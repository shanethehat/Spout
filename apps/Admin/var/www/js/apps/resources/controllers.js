'use strict';

app.controller('ResourcesCtrl', function($scope, resources, types, $state, $rootScope) {
  $scope.types = types;
  $scope.resources = resources;

  $scope.$watch('resources._pager.current', function(page){
    if (page !== undefined) {
      $state.go('resources', {start: page});
    }
  });

  $scope.delete = function(resource) {
    if (!confirm("Are you sure?")) {
      return;
    }
    resource.remove().then(function() {
      $rootScope.$emit('sp.message', {title: 'Resource removed successfully', type: "success"});
    });
  };
});

app.controller('ResourceCtrl', function($scope, resource) {
  $scope.resource = resource;
});

app.controller('ResourceTypeResolveCtrl', function($scope, type) {
  $scope.type = type;
});

app.controller('ResourceAddCtrl', function($scope, Restangular, $modalInstance, $rootScope) {
  $scope.close = $modalInstance.close;
  $scope.resource = { fields: {}};
  $scope.submit = function () {
    $scope.resource.type = $scope.type;
    Restangular.all('resources/index').post($scope.resource).then(function () {
      $scope.close();
      $rootScope.$emit('sp.message', {title: 'Resource added successfully', type: "success"});
    });
  };
});

app.controller('ResourceEditCtrl', function($scope, Restangular, $modalInstance, $rootScope) {

  $scope.close = $modalInstance.close;

  parseResourceObject($scope.resource);

  $scope.submit = function () {
    $scope.resource.type = $scope.type;
    $scope.resource.put().then(function () {
      $rootScope.$emit('sp.message', {title: 'User added successfully', type: "success"});
      $rootScope.$emit('resources.reload', true);
    });
  };

});

function parseResourceObject(resource) {
  angular.forEach(resource.fields, function(object, key) {
    if (object && typeof object.value === 'string') {
      resource.fields[key] = object.value;
    }
    if (object && object.values) {
      console.log(object, key, resource);
      resource.fields[key] = object.values;
    }
  });
}
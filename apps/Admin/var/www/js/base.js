var app = angular.module('spout', ['ngRoute', 'restangular', 'ngAnimate']);

app.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[').endSymbol(']}');
});

app.run(function(Restangular, $rootScope) {
  Restangular.setBaseUrl('/api');
  //Restangular.setResponseInterceptor(function(data, operation, what, request, response) {
  //   if (data.message) {
  //     $rootScope.$emit('message', {message: data.message});
  //   }
  //   return data;
  // });
  Restangular.setErrorInterceptor(function(response) {
    if (response.status) {
      $rootScope.$emit('sp.message', {title: response.data.title, message: response.data.message, type: "danger"});
    }
    return response;
  });
  // Restangular.setFullRequestInterceptor(function(element, operation, route, url, headers, params) {
  //     return {
  //       element: element,
  //       params: params,
  //       headers: headers
  //     };
  // });

});

app.directive('errorWindow', function($rootScope, $timeout) {
  return {
    restrict: 'E',
    template: '<div class="row sp-float animate-show" ng-show="show">' +
    '<div class="col-md-8 col-md-offset-2 panel sp-panel panel-{{type}}">' +
        '<div class="panel-heading">' +
            '<h4 class="panel-title"><span class="glyphicon glyphicon-warning-sign"></span> {{title}}</h4>' +
        '</div>' +
        '<div class="panel-body" ng-show="message">' +
            '<p>{{message}}</p>' +
        '</div>' +
    '</div>' +
'</div>',
    link: function(scope) {

      function restore() {
        scope.$apply(function() {
          scope.show = false;
        });
      }

      $rootScope.$on('sp.message', function(obj, options) {
        scope.show = true;
        scope.title = options.title;
        scope.message = options.message;
        scope.type = options.type;
        $timeout(restore, 3000);
      });
    }
  }
});

app.service('parseFormErrors', function() {
  return function (data, form) {
    for(property in data.errors) {
      form[property].$dirty = true;
      form[property].$invalid = true;
      form[property].$message = data.errors[property];
    }
  }
});


app.directive('formfieldErrorMsg', function() {

  return {
    restrict: 'E',
    replace: true,
    transclude: false,
    scope: { field: '=' },
    template: '<p class="help-block" ng-show="showMessage()">{{getMessage()}}</p>',
    link: function(scope, element, attrs) {
      var form = attrs.field.split(".")[0],
        property = attrs.field.split(".")[1];
      
      scope.message = attrs.msg;
      scope.showMessage = function () {
        return scope.field.$dirty && scope.field.$invalid;
      };

      scope.getMessage = function() {
        if (!scope.field.$message) {
          return scope.message;
        }
        return scope.field.$message;
      }

    }
  };
});

app.controller('ModalCtrl', function($rootScope, $element) {
  $rootScope.$on('modal.open', function(){
    $($element).modal('show');
  });

  $rootScope.$on('modal.close', function(){
    $($element).modal('hide');
  });
});
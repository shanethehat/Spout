'use strict';

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/resources/2');

  $stateProvider.state('resources', {
    url: "/resources/:start",
    templateUrl: '/js/templates/resources/index.html',
    authenticate: true,
    controller: 'ResourcesCtrl',
    resolve: {
      resources: ['Restangular', '$stateParams', function (Restangular, $stateParams) {
        return Restangular.all('resources/index').getList({_start:$stateParams.start});
      }],
      types: ['Restangular', function (Restangular) {
        return Restangular.all('resources/types').getList();
      }]
    }
  })
    .state('resources.add', {
      url: "/add/:type",
      authenticate: true,
      controller: 'ModalCtrl',
      template: "<div ui-view></div>",
      resolve: {
        params: function () {
          return {
            templateUrl: "/js/templates/resources/add.html",
            controller: 'ResourceAddCtrl',
            onComplete: '^',
            resolve: {
              type: ['Restangular', '$stateParams', function (Restangular, $stateParams) {
                return Restangular.one("resources/types").get({slug: $stateParams.type});
              }]
            }
          };
        }
      }
    })
    .state('resources.add.media', {
      url: "/media/:field",
      authenticate: true,
      controller: 'ModalCtrl',
      resolve: {
        params: function () {
          return {
            windowClass: "sp-modal__double",
            templateUrl: "/js/templates/resources/media.html",
            controller: 'ResourceMediaAddCtrl',
            onComplete: '^',
            reload: false,
            resolve: {
              media: ['Restangular', function (Restangular) {
                return Restangular.all('media/index').getList()
              }],
              field: ['$stateParams', function ($stateParams) {
                return $stateParams.field;
              }]
            }
          };
        }
      }
    })
    .state('resources.edit', {
      url: "/edit/:type/:slug",
      authenticate: true,
      template: "<div ui-view></div>",
      controller: 'ModalCtrl',
      resolve: {
        params: function () {
          return {
            templateUrl: "/js/templates/resources/add.html",
            controller: 'ResourceEditCtrl',
            onComplete: '^',
            resolve: {
              resource: ['Restangular', '$stateParams', function (Restangular, $stateParams) {
                return Restangular.one("resources/detail").get({type:$stateParams.type, slug:$stateParams.slug});
              }],
              type: ['Restangular', '$stateParams', function (Restangular, $stateParams) {
                return Restangular.one("resources/types").get({slug: $stateParams.type});
              }]
            }
          };
        }
      }
    })
    .state('resources.edit.media', {
      url: "/media/:field",
      authenticate: true,
      controller: 'ModalCtrl',
      resolve: {
        params: function () {
          return {
            windowClass: "sp-modal__double",
            templateUrl: "/js/templates/resources/media.html",
            controller: 'ResourceMediaAddCtrl',
            onComplete: '^',
            reload: false,
            resolve: {
              media: ['Restangular', function (Restangular) {
                return Restangular.all('media/index').getList()
              }],
              field: ['$stateParams', function ($stateParams) {
                return $stateParams.field;
              }]
            }
          };
        }
      }
    });
}]);
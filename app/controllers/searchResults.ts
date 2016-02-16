'use strict';

export default function(app) {
  app.controller('SearchResultsCtrl', ['$scope', '$location', '$routeParams', '$http', 'config',
    function($scope, $location, $routeParams, $http, config) {

      if ($routeParams.param.title) {
        $scope.input = $routeParams.param.title;
      } else {
        $scope.input = $routeParams.param;
      }

      $scope.search = function(input, limit) {
        return $http.get(config.apiUrl + '/documents/', {
          params: {q: input, limit: limit, restrictToLatest: true}
        })
        .then(
          function(response) {
            return $scope.documents = response.data.documents;
          },
          function(response) {
            notificationService.notifications.push({
              type: 'error',
              message: 'Could not fetch documents'
            });
          }
        );
      };

      $scope.search($scope.input, 10);

      $scope.totalItems = 64;
      $scope.currentPage = 4;

    }
  ]);
};
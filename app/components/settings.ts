import { cloneDeep, find } from 'lodash';

export default function(app) {
  app.component('settings', {
    controller: [
      '$scope', 'authService',
      function($scope, authService) {
        $scope.tab = 'profile';
        $scope.auth = authService;

        // keep user copy up to date
        $scope.$watch('auth.user', function(user) {
          $scope.user = cloneDeep(user);
        });

        // sync from orcid
        /*$scope.syncFromOrcid = function() {
          $scope.busy = 'sync';

          const account = _.findLast($scope.user.externalIds, {type: 'orcid'});

          $http.put(config.apiUrl +
          '/people/' + $scope.user.id + '/syncFromOrcid').
          success(function(data) {
          $scope.busy = false;
          authService.user = data;
          }).
          error(function(data) {
          $scope.busy = false;
          notificationService.httpError('could not sync data');
          });
          };*/

        $scope.find = find;
      },
    ],
    template: require('./settings.html'),
  });
};

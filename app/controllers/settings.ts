import * as _ from 'lodash';

export default function(app) {

  app.controller('SettingsCtrl', [
    '$scope', '$http', 'config', 'authService', 'notificationService',
    function($scope, $http, config, authService, notificationService) {
      $scope.tab = 'profile';
      $scope.auth = authService;

      $scope.setting = {};

      // keep user copy up to date
      $scope.$watch('auth.user', function(user) {
        $scope.user = _.cloneDeep(user);
      });

      $scope.addEmail = function(address) {
        console.log(address);
        $http.post(`${config.apiUrl}/people/${$scope.user.id}/emails`, {
          email: address,
          frontendUrl: authService.frontendUrl,
          returnUrl: authService.returnPath
        }).then(function(data){
          // TODO show message
          console.log(data);
        });
      };

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

      $scope.find = _.find;

      // save to api
      $scope.save = function() {
        $scope.busy = 'save';

        const obj = _.cloneDeep($scope.user);

        // TODO revisit. whitelist?
        // remove all keys which we are not allowed to set
        const deleteKeys = ['id', 'gravatarMd5', 'firstSignin',
          'createdAt', 'updatedAt', 'externalIds'];
        _.forEach(deleteKeys, function(key) { delete obj[key]; });

        delete obj.account.createdAt;

        // save
        $http.put(config.apiUrl + '/people/' + $scope.user.id, obj).
          success(function(data) {
            $scope.busy = false;
            authService.user = data;
            $scope.setting.succeeded = true;
            setTimeout(function() {
              $scope.setting.succeeded = false;
              $scope.$apply();
            }, 5000);
          }).
          error(function(data) {
            $scope.busy = false;
            notificationService.httpError('could not save data');
            $scope.setting.succeeded = false;
          });
      };
    }
  ]);
};

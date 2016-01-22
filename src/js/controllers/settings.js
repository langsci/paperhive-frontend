'use strict';
var _ = require('lodash');

module.exports = function(app) {

  app.controller('SettingsCtrl', ['$scope', '$http', 'config', 'authService',
    function($scope, $http, config, authService) {
      $scope.tab = 'profile';
      $scope.auth = authService;

      // keep user copy up to date
      $scope.$watch('auth.user', function(user) {
        $scope.user = _.cloneDeep(user);
      });

      // sync from orcid
      $scope.syncFromOrcid = function() {
        $scope.busy = 'sync';

        var account = _.find($scope.user.accounts, {type: 'orcid'});

        $http.put(config.apiUrl +
                  '/users/' + $scope.user.id + '/syncFromOrcid/' + account.id).
          success(function(data) {
            $scope.busy = false;
            authService.user = data;
          }).
          error(function(data) {
            $scope.busy = false;
            // TODO
            //console.log(data);
          });
      };

      // save to api
      $scope.save = function() {
        $scope.busy = 'save';

        var obj = _.cloneDeep($scope.user);

        // TODO revisit. whitelist?
        // remove all keys which we are not allowed to set
        var deleteKeys = ['id', 'gravatarMd5', 'firstSignin',
          'createdAt', 'updatedAt', 'externalIds'];
        _.forEach(deleteKeys, function(key) { delete obj[key]; });

        // save
        $http.put(config.apiUrl + '/people/' + $scope.user.id, obj).
          success(function(data) {
            $scope.busy = false;
            authService.user = data;
          }).
          error(function(data) {
            $scope.busy = false;
            // TODO
          });
      };
    }
  ]);
};

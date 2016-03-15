import { pick } from 'lodash';

import template from './template.html!text';

export default function(app) {

  app.component(
    'discussionThreadView', {
      template,
      controller: [
        '$scope', '$rootScope', 'authService', '$routeSegment', '$http', 'config',
        'notificationService', 'metaService',
        function(
          $scope, $rootScope, authService, $routeSegment, $http, config,
          notificationService, metaService
        ) {
          $scope.auth = authService;

          // fetch discussion
          $http({
            url: config.apiUrl + '/discussions/' + $routeSegment.$routeParams.discussionId,
            method: 'GET'
          })
          .success(function(discussion) {
            $scope.discussion = discussion;
            metaService.set({
              title: discussion.title +
                ($scope.revisions && $scope.latestOAIdx ?
                 (' · ' + $scope.revisions[$scope.latestOAIdx].title) :
                 ''
                ) +
                ' · PaperHive',
              meta: [
                {
                  name: 'author',
                  content: discussion.author.displayName
                },
                // TODO rather use title here?
                {
                  name: 'description',
                  content: 'Annotation by ' +
                    discussion.author.displayName + ': ' +
                    (discussion.body ?
                    discussion.body.substring(0, 150) : '')
                },
                {
                  name: 'keywords',
                  content: discussion.tags ?
                    discussion.tags.join(', ') : undefined
                }
              ]
            });
          })
          .error(notificationService.httpError('could not fetch discussion'));

          // Problem:
          //   When updateTitle() is run, the newTitle needs to be populated in
          //   the scope. This may not necessarily be the case.
          // Workaround:
          //   Explicitly set the newTitle in the $scope.
          // Disadvantage:
          //   The title is set twice, and this is kind of ugly.
          // TODO find a better solution
          $scope.updateTitle = function(newTitle) {
            $scope.discussion.title = newTitle;
            $scope.updateDiscussion($scope.discussion);
          };

          $scope.updateDiscussion = function(comment) {
            $scope.submitting = true;
            const newDiscussion = pick(
              comment,
              ['title', 'body', 'target', 'tags']
            );

            return $http({
              url: config.apiUrl + '/discussions/' + $routeSegment.$routeParams.discussionId,
              method: 'PUT',
              headers: {'If-Match': '"' + $scope.discussion.revision + '"'},
              data: newDiscussion
            })
            .success(function(discussion) {
              $scope.submitting = false;
              $scope.discussion = discussion;
            })
            .error(function(data) {
              $scope.submitting = false;
            })
            .error(notificationService.httpError('could not update discussion'));
          };

          $scope.addReply = function(body) {
            $scope.submitting = true;
            $http.post(
              config.apiUrl +
                '/replies/',
              {
                body: body,
                discussion: $routeSegment.$routeParams.discussionId
              }
            )
            .success(function(reply) {
              $scope.submitting = false;
              $scope.discussion.replies.push(reply);
            })
            .error(function(data) {
              $scope.submitting = false;
            })
            .error(notificationService.httpError('could not update reply'));
          };

          $scope.updateReply = function(comment, index) {
            return $http({
              url: config.apiUrl + '/replies/' + comment.id,
              method: 'PUT',
              headers: {'If-Match': '"' + comment.revision + '"'},
              data: {body: comment.body}
            })
            .success(function(data) {
              $scope.discussion.replies[index] = data;
            })
            .error(notificationService.httpError('could not update reply'));
          };

          $scope.deleteReply = function(comment, index) {
            return $http({
              url: config.apiUrl + '/replies/' + comment.id,
              method: 'DELETE',
              headers: {'If-Match': '"' + comment.revision + '"'}
            })
            .success(function(data) {
              $scope.discussion.replies.splice(index, 1);
            })
            .error(notificationService.httpError('could not delete reply'));
          };
        }
      ]}
  );
};

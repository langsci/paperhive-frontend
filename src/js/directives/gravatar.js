module.exports = function (app) {
  'use strict';

  app.directive('gravatarUser', function() {
    return {
      restrict: 'A',
      scope: {
        gravatarUser: '=',
        gravatarSize: '=',
      },
      link: function(scope, element, attrs) {
        if (!scope.gravatarSize) {
          console.error("Directive needs gravatarSize.");
        }
        scope.$watch(
          'gravatarUser', function(user) {
            if (!user) {
              return;
            }
            element.attr('width', scope.gravatarSize + 'px');
            element.attr('height', scope.gravatarSize + 'px');
            element.attr(
              'src',
              "https://secure.gravatar.com/avatar/" +
              user.gravatarMd5 +
              "?s=" + scope.gravatarSize +
              "&d=identicon"
            );
            element.attr('alt', user.displayName + " avatar");
          }
        );
      }
    };
  });
};

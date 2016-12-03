import * as angular from 'angular';

export default function(app) {
  app.directive('attributes', [function() {
    return {
      restrict: 'A',
      scope: {
        attributes: '=',
      },
      link: (scope, element, attr) => {
        scope.$watch('attributes', function(attributes, oldAttributes) {
          // angular.copy strips keys added by angular, e.g., $$hashKey
          angular.forEach(angular.copy(oldAttributes), function(_, attribute) {
            element.removeAttr(attribute);
          });
          element.attr(angular.copy(attributes));
        });

      },
    };
  }]);
};

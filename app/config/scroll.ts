export default function(app) {
  app.run([
    '$rootScope', '$location', '$anchorScroll', '$routeParams',
    function($rootScope, $location, $anchorScroll, $routeParams) {
      // take into account the navbar (65px + 10px extra)
      $anchorScroll.yOffset = 75;

      // add scroll handler on route change
      // http://stackoverflow.com/questions/14712223/how-to-handle-anchor-hash-linking-in-angularjs
      $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
        // $location.hash($routeParams.scrollTo);
        $anchorScroll();
      });
    },
  ]);
};

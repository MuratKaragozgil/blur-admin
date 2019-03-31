(function() {
  'use strict';

  angular.module('BlurAdmin.pages.config')
    .run(stateChangeStart);

  /** @ngInject */
  function stateChangeStart($rootScope, $state, localStorage, sessionStorage) {
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
      let token = sessionStorage.get('token');
      if (toState.authenticate && _.isEmpty(token)) {
        // User isn’t authenticated
        $state.transitionTo("authSignIn");
        event.preventDefault();
      }
    });
  }

})();

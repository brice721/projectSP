(function() {
	'use strict';


/**
 * Provides a means of attaching animations only if user 'Is Flashy'
 * Meaning only if they navigate to a certain page by way of a specific button
 */

angular
    .module('sp-manager', [
        'sp-manager.roots'
    ]);

angular
    .module('sp-manager.roots', [])
    .provider('FlashManager', function () {

        this.$get = ['$rootScope', function ($rootScope) {


            $rootScope.isFlashy = false;

            $rootScope.loggedInUser = localStorage.getItem('current-user-username');

            function flashify() {
                $rootScope.isFlashy = true;
                var store = 'true';
                localStorage.setItem('flash', store);
            }

            function unFlashify() {
                $rootScope.isFlashy = false;
                localStorage.removeItem('flash');
            }

            function checkOnRefresh() {
                $rootScope.$on('$viewContentLoaded', function() {
                    if (localStorage.getItem('flash') === 'true') {
                        flashify();
                    }
                })
            }

            return {
                flashify: flashify,
                unFlashify: unFlashify,
                checkOnRefresh: checkOnRefresh
            }
        }];
    });
}());
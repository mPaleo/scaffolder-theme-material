(function ()
{
    'use strict';

    angular
        .module('app.toolbar')
        .controller('ToolbarController', ToolbarController);

    /** @ngInject */
    function ToolbarController($rootScope, $mdSidenav, $translate, $mdToast)
    {
        var vm = this;
        var teste = 0;
        // Data
        vm.bodyEl = angular.element('body');
        $rootScope.global = {
            search: ''
        };
        vm.userStatusOptions = [
            {
                'title': 'Online',
                'icon' : 'icon-checkbox-marked-circle',
                'color': '#4CAF50'
            },
            {
                'title': 'Away',
                'icon' : 'icon-clock',
                'color': '#FFC107'
            },
            {
                'title': 'Do not Disturb',
                'icon' : 'icon-minus-circle',
                'color': '#F44336'
            },
            {
                'title': 'Invisible',
                'icon' : 'icon-checkbox-blank-circle-outline',
                'color': '#BDBDBD'
            },
            {
                'title': 'Offline',
                'icon' : 'icon-checkbox-blank-circle-outline',
                'color': '#616161'
            }
        ];
        vm.languages = [
            {
                'title'      : 'Portuguese',
                'translation': 'TOOLBAR.PORTUGUESE',
                'code'       : 'pt_BR',
                'flag'       : 'br'
            },
            {
                'title'      : 'English',
                'translation': 'TOOLBAR.ENGLISH',
                'code'       : 'en',
                'flag'       : 'gb'
            }
        ];

        // Methods
        vm.toggleSidenav = toggleSidenav;
        vm.logout = logout;
        vm.changeLanguage = changeLanguage;
        vm.setUserStatus = setUserStatus;
        vm.toggleHorizontalMobileMenu = toggleHorizontalMobileMenu;

        //////////

        vm.userStatus = vm.userStatusOptions[0];
        vm.selectedLanguage = vm.languages[0];

        /**
         * Toggle sidenav
         *
         * @param sidenavId
         */
        function toggleSidenav(sidenavId)
        {
           
            var resto = teste/2;
            var button = document.getElementById('navigation-toggle');
            var div= document.getElementById('vertical-navigation');

            if(resto == 0){
                 button.classList.add("margin-right-menu-mais");
                 button.classList.remove("margin-right-menu");
                
                div.classList.remove("md-locked-open");
                div.classList.add('md-closed');
                teste = 1;
            }else{
                div.classList.add("md-locked-open","md-closed");               
                div.classList.remove('md-closed');
                 button.classList.remove("margin-right-menu-mais");
                 button.classList.add("margin-right-menu");
              
                teste = 0;
            }
    
            //$mdSidenav(sidenavId).toggle();
            
           
        }

        /**
         * Sets User Status
         * @param status
         */
        function setUserStatus(status)
        {
            vm.userStatus = status;
        }

        /**
         * Logout Function
         */
        function logout()
        {

        }

        /**
         * Change Language
         */
        function changeLanguage(lang)
        {
            vm.selectedLanguage = lang;

            // Show temporary message if user selects a language other than English
            if ( lang.code !== 'en' && lang.code !== 'pt_BR')
            {
                var message = 'scaffolder supports translations through angular-translate module, but currently we do not have any translations other than English language. If you want to help us, send us a message through ThemeForest profile page.';

                $mdToast.show({
                    template : '<md-toast id="language-message" layout="column" layout-align="center start"><div class="md-toast-content">' + message + '</div></md-toast>',
                    hideDelay: 7000,
                    position : 'top right',
                    parent   : '#content'
                });

                return;
            }

            //Change the language
            $translate.use(lang.code);
        }

        /**
         * Toggle horizontal mobile menu
         */
        function toggleHorizontalMobileMenu()
        {
            vm.bodyEl.toggleClass('ms-navigation-horizontal-mobile-menu-active');
        }
    }

})();
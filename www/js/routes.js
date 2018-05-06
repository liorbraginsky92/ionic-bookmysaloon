angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    
  

      .state('menu.home', {
    url: '/home',
    views: {
      'side-menu21': {
        templateUrl: 'templates/home.html',
        controller: 'shopCtrl'
      }
    }
  })
 .state('no_connec', {
    url: '/no_connec',
    templateUrl: 'templates/no_connec.html',
    controller: 'shopCtrl'
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    abstract:true,
    controller: 'signinCtrl'
  })

  .state('signin', {
    url: '/signin',
    templateUrl: 'templates/signin.html',
    controller: 'signinCtrl'
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'signinCtrl'
  })

  .state('menu.shopdetail', {
    url: '/shopdetail',
    views: {
      'side-menu21': {
        templateUrl: 'templates/shopdetail.html',
        controller: 'shopCtrl'
      }
    }
  })

  .state('menu.date', {
    url: '/date',
    views: {
      'side-menu21': {
        templateUrl: 'templates/date.html',
        controller: 'bookingCtrl'
      }
    }
  })

  
  .state('menu.bookreview', {
    url: '/bookreview',
    views: {
      'side-menu21': {
        templateUrl: 'templates/bookreview.html',
        controller: 'bookingCtrl'
      }
    }
  })

  .state('bookingconfirmation', {
    url: '/bookingconfirmation',
    templateUrl: 'templates/bookingconfirmation.html',
    controller: 'bookingCtrl'
  })

  .state('mybooking', {
    url: '/mybooking',
    templateUrl: 'templates/mybooking.html',
    controller: 'profileCtrl'
  })

  .state('profile', {
    url: '/profile',
    templateUrl: 'templates/profile.html',
    controller: 'profileCtrl'
  })
  
   .state('userfavshops', {
    url: '/userfavshops',
    templateUrl: 'templates/userfavshops.html',
    controller: 'profileCtrl'
  })

  .state('bookinghistory', {
    url: '/bookinghistory',
    templateUrl: 'templates/bookinghistory.html',
    controller: 'profileCtrl'
  })

 

$urlRouterProvider.otherwise('side-menu21/home')

  

});
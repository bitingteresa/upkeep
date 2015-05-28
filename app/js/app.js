(function() {
  'use strict';

  angular.module('upkeep', [
      'ui.router',
      'upkeepFactories',
      'upkeepCtrls'
    ])
    
      .config(function ($stateProvider) {
      $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      });
     
      $stateProvider  	
  		.state('subcategories', {
  			url:"/:subcategories",
  			templateUrl: "views/subcategories.html",
  			controller: 'SubCatCtrl',
  		});
      
      $stateProvider  	
  		.state('summary', {
  			url:"/:subcategories/:summary",
  			templateUrl: "views/summary.html",
  			controller: 'SummaryCtrl'
  		});
	    	
    })
    
  	.run(['$state', function($state) {
  		$state.go('home');
  	}]);
    
}());



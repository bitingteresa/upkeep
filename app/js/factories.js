(function() {
	'use strict';
	
	angular.module('upkeepFactories', [])
	
	.factory("ApiFactory", ["$q", "$http", function($q, $http) {
		var apiUrl = 'https://api.parse.com/1/classes/auto';
	  $http.defaults.headers.common['X-Parse-Application-Id'] = ;
	  $http.defaults.headers.common['X-Parse-REST-API-Key'] = ;
	  $http.defaults.headers.common['Content-Type'] = 'application/json';	
	  	return {
	     getData: function() {
	       var deferred = $q.defer();
	       $http.get(apiUrl).success(function(result) {
	      	 deferred.resolve(result);
	         })
	         .error(function(result) { deferred.reject(result); 
	         });
	         return deferred.promise;
	       },
	  	createData: function(carService) {
    		$http.post(apiUrl, carService).success(function(status){
    			return status;
    		});		
    	}
	    };
	    
	    
	}]);
	
}());

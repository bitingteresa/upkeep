(function() {
  'use strict';

  angular.module('upkeepCtrls', [
        'upkeepFactories'                         
    ])
     
    .controller('HomeCtrl', ['$scope', function ($scope) {
    	removeSplashScreen();
      ////////////
      function removeSplashScreen(){
        angular.element(document.getElementsByTagName("body")).addClass("contentLoaded");
      }
    }])
   
    .controller('SubCatCtrl', ['$scope', '$stateParams', 'ApiFactory', function($scope, $stateParams, ApiFactory){
    	$scope.date = new Date();
    	$scope.subCategoryGroup = { 
    		"fluids":  ["Engine Oil", "Power Steering", "Transmission"],
    		"ignition":  ["Battery", "Belts", "Spark Plugs"],
    		"brakes": ["Brake Fluid", "Brake Pads", "Rotors"],
    		"miscellaneous": ["Rotate Tires", "Air Filter", "Exhaust"],
    	};
    	$scope.iconGroup = {
    			"Engine Oil": "images/engineoil.gif",
    			"Power Steering": "images/powsteer.gif",
      		"Transmission": "images/transoil.gif",
      		"Battery": "images/battery.gif",
      		"Belts": "images/belts.png",
      		"Spark Plugs": "images/sparkplugs.gif",
      		"Brake Fluid": "images/brakefluid.gif",
      		"Brake Pads": "images/brakepads.gif",
      		"Rotors": "images/rotors.gif",
      		"Rotate Tires": "images/tirerotation.gif",
      		"Air Filter": "images/airfilter.gif",
      		"Exhaust": "images/exhaust.gif",	
    	};
    	$scope.summaryGroup = {
      		"Engine Oil": "oil change",
      		"Power Steering": "power steering",
      		"Transmission": "transmission",
      		"Battery": "battery",
      		"Belts": "belts",
      		"Spark Plugs": "spark plugs",
      		"Brake Fluid": "brake fluid",
      		"Brake Pads": "brake pads",
      		"Rotors": "rotors",
      		"Rotate Tires": "rotate tires",
      		"Air Filter": "air filter",
      		"Exhaust": "exhaust",
      	};
    	$scope.headings = $stateParams.subcategories;
    	$scope.currentCategory;
    		for (var category in $scope.subCategoryGroup){
    			if (category == $stateParams.subcategories) {
    				$scope.currentCategory = $scope.subCategoryGroup[category];
    			}
    		}
    	$scope.create = function(carService) {
    		ApiFactory.createData({service: carService, dos: {__type: 'Date', iso: $scope.date}});
    		};
    }])
    
    .controller('SummaryCtrl', ['$scope', 'ApiFactory', '$stateParams', '$state', function($scope, ApiFactory, $stateParams, $state) {
    	$scope.date = new Date();
    	$scope.data = { status: "Not Loaded." };
    	$scope.headings = $stateParams.subcategories; 
    	$scope.currentSummary = $stateParams.summary;
    	$scope.infoGroup = {
    			"oil change": "Oil lubricates and acts as a cooling agent in your engine and needs to changed as it degrades.",
      		"power steering": "Hydraulic fluid transmits power in your power steering system and may need to be periodically flushed and replenished.",
      		"transmission": "Fluid that lubricates the moving parts in your transmission and needs to be changed as it degrades or is contaminated.",
      		"battery": "Provides energy required to start your car and stabilize voltage when the car is running.",
      		"belts": "Drive components in the engine like the alternator and needs to be checked for wear and tear.",
      		"spark plugs": "Creates a spark at the one end to ignite the gas mixture and needs to be replaced as it degrades.",
      		"brake fluid": "Hydraulic fluid that amplifies braking force and needs to be periodically flushed and replenished.",
      		"brake pads": "Pads clamp onto the rotors to help slow or stop your vehicle and need to be periodically replaced.",
      		"rotors": "Brake pads squeeze the surface of the rotor and the rotor stops the wheel from turning and they need to be checked for wear and tear.",
      		"rotate tires": "Rotating tires can distribute wear equally and extend the life of a tire.",
      		"air filter": "Filter prevents harmful debris from entering your engine.",
      		"exhaust": "Directs fumes away from passengers.",	
    	};
    	ApiFactory.getData().then(function(data) {
    		$scope.services = [];
    		for (var i = 0; i < data.results.length; i++) {
    			if (data.results[i].service == $scope.currentSummary) {
    				$scope.services.push(data.results[i]);
    			}
    		}
    	$scope.create = function(carService) {
      		ApiFactory.createData({service: carService, dos: {__type: 'Date', iso: $scope.date}});
      			$state.reload();
    	};
    	});
    }])
    
    .controller('KillCtrl', ['$scope', function($scope) {
  		$scope.kill= function () { 
  			gm.system.closeApp();
  		};
  	}]);

}());


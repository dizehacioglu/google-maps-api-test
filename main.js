var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;
var autocomplete, autocomplete2;
var steps;
var latLangs = [];

var initialize = function(){
	// directionsDisplay = new google.maps.DirectionsRenderer();
 //    var mapOptions = {
 //      center: { lat: 40.015, lng: -105.27},
 //      zoom: 8
 //    };
 //    var map = new google.maps.Map(document.getElementById('map-canvas'),
 //        mapOptions);

 //    directionsDisplay.setMap(map);


 //    // Consolidate:
 //    var input = $('#pac-input');
 //    // console.log(input);
 //    var input2 = document.getElementById('pac-input');
 //    // console.log(input2);

 //    autocomplete = new google.maps.places.Autocomplete(
 //    	(document.getElementById('pac-input')),
 //    	{types: ['geocode'] 
 //    });

 //    autocomplete2 = new google.maps.places.Autocomplete(
 //      (document.getElementById('pac-input2')),
 //      {types: ['geocode'] 
 //  	});
 } // End initialize()





var calcRoute = function(){

	directionsDisplay = new google.maps.DirectionsRenderer();
    var mapOptions = {
      center: { lat: 40.015, lng: -105.27},
      zoom: 8
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    directionsDisplay.setMap(map);


    // Consolidate:
    var input = $('#pac-input');
    // console.log(input);
    var input2 = document.getElementById('pac-input');
    // console.log(input2);

    autocomplete = new google.maps.places.Autocomplete(
    	(document.getElementById('pac-input')),
    	{types: ['geocode'] 
    });

    autocomplete2 = new google.maps.places.Autocomplete(
      (document.getElementById('pac-input2')),
      {types: ['geocode'] 
  	});
  
	var start;
	var end;

	$('#route').on('submit', function(e){
		e.preventDefault();

		start = $(this).find('[name=origin]').val();
		end = $(this).find('[name=destination]').val();

		var request = {
			origin: start,
			destination: end,
			travelMode: google.maps.TravelMode.DRIVING
		};
		
		directionsService.route(request, function(result, status){
			if(status == google.maps.DirectionsStatus.OK){
				directionsDisplay.setDirections(result);
				steps = result.routes[0].legs[0].steps;
				console.log(steps);
				console.log(steps[0].lat_lngs.length);

				// Get each latitude, longitude coordinate
				// and store them in an array
				steps.map(function(step){
					// console.log(step.lat_lngs);
					step.lat_lngs.map(function(coordinate){
						// console.log(coordinate.toString());
						latLangs.push({
							lat: coordinate.A,
							lng: coordinate.F
						});
					})
				})

				console.log(latLangs);

				for(var i = 0; i < latLangs.length; i++){
					var location = new google.maps.LatLng(latLangs[i].lat, latLangs[i].lng);
					var request = {
						location: location,
						radius: 500
					};
					// console.log(request);
					var service = new google.maps.places.PlacesService(map);
					// console.log('service worked');
					// console.log(map);
					service.nearbySearch(request, callback);
					// console.log('nearbysearch worked');
				}


			}
			else{
				console.log('Error');
			}
		});
	});
}; // End calcRoute()

calcRoute();

var callback = function(results, status){
	if(status == google.maps.places.PlacesServiceStatus.OK){
		for(var i = 0; i < results.length; i++){
			createMarker(results[i]);
		}
	}
}

var createMarker = function(place){
	var placeLocation = place.geometry.location;
	var Marker = new google.maps.Marker({
		map: map,
		position: place.geometry.location
	});
}

google.maps.event.addDomListener(window, 'load', initialize);










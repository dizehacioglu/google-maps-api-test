var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

function initialize() {
	directionsDisplay = new google.maps.DirectionsRenderer();
    var mapOptions = {
      center: { lat: 40.015, lng: -105.27},
      zoom: 8
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    directionsDisplay.setMap(map);
 }

//google.maps.event.addDomListener(window, 'load', initialize);

initialize();



var calcRoute = function(){
  
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
			}
			else{
				console.log('Error');
			}
		});
	});
};

calcRoute();


// // console.log('map');

// var directionsDisplay;
// var directionsService = new google.maps.DirectionsService();
// var map;

// function initialize() {
//   directionsDisplay = new google.maps.DirectionsRenderer();
//   var chicago = new google.maps.LatLng(41.850033, -87.6500523);
//   var mapOptions = {
//     zoom:7,
//     center: chicago
//   };
//   map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
//   directionsDisplay.setMap(map);
// }

// function calcRoute() {
//   var start = document.getElementById("start").value;
//   var end = document.getElementById("end").value;
//   var request = {
//     origin:start,
//     destination:end,
//     travelMode: google.maps.TravelMode.DRIVING
//   };
//   directionsService.route(request, function(result, status) {
//     if (status == google.maps.DirectionsStatus.OK) {
//       directionsDisplay.setDirections(result);
//     }
//   });
// }

// google.maps.event.addDomListener(window, 'load', initialize);
var directionsDisplay;
var map;

function initialize() {
	directionsDisplay = new google.maps.DirectionsRenderer();
    var mapOptions = {
      center: { lat: -34.397, lng: 150.644},
      zoom: 8
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);
    directionsDisplay.setMap(map);
  }



google.maps.event.addDomListener(window, 'load', initialize);

var directionsService = new google.maps.DirectionsService();

var calcRoute = function(){
	var start = 'chicago, il';
	var end = 'joplin, mo';
	var request = {
		origin: start,
		destination: end,
		travelMode: google.maps.TravelMode.DRIVING
	};
};




// console.log('map');
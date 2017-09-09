var map;

var locations = [
	  {title: 'Northstar, California', location: {lat: 39.27324, lng: -120.1624164}},
	  {title: 'Boreal Mountain', location: {lat: 39.3317, lng: -120.3511}},
	  {title: 'Sugar Bowl Ski Resort', location: {lat: 39.3043494, lng: -120.3357567}},
	  {title: 'Tahoe Donner', location: {lat: 39.3524057, lng: -120.271583}},
	  {title: 'Alpine Meadows, California', location: {lat: 39.1574066, lng: -120.2390835}}
];


// Create a new blank array for all the listing markers.
var markers = [];
function initMap() {
	var tahoe = {lat: 39.0968, lng: -120.0324}
	// Constructor creates a new map - only center and zoom are required.
	map = new google.maps.Map(document.getElementById('map'), {
	  center: tahoe,
	  zoom: 13
	});

	var largeInfowindow = new google.maps.InfoWindow();
	var bounds = new google.maps.LatLngBounds();
	// The following group uses the location array to create an array of markers on initialize.
	for (var i = 0; i < locations.length; i++) {
	  // Get the position from the location array.
	  var position = locations[i].location;
	  var title = locations[i].title;
	  // Create a marker per location, and put into markers array.
	  var marker = new google.maps.Marker({
	    map: map,
	    position: position,
	    title: title,
	    animation: google.maps.Animation.DROP,
	    id: i
	  });
	  // Push the marker to our array of markers.
	  markers.push(marker);

	  //bind markers to each location object
	  (function(i){locations[i].marker = marker}(i))

	  // Create an onclick event to open an infowindow at each marker.

	  marker.addListener('click', function() {
	  	console.log(this);
	    populateInfoWindow(this, largeInfowindow);
	  });
	  bounds.extend(markers[i].position);
	}
	// Extend the boundaries of the map for each marker
	map.fitBounds(bounds);
}



// This function populates the infowindow when the marker is clicked. We'll only allow
// one infowindow which will open at the marker that is clicked, and populate based
// on that markers position.
function populateInfoWindow(marker, infowindow) {


	var query = marker.title,
		dt = 'jsonp',
    	wikiBase = 'https://en.wikipedia.org/w/api.php',
    	wikiUrl = wikiBase + '?action=opensearch&search=' + query + '&format=json&callback=wikiCallback';

	$.ajax({
  		url: wikiUrl,
  		dataType: dt,
  		success: function(response) {
    		console.log(response);
    		// console.log(response[2][0]);
    		var responseData = response[2][0]



			if(document.getElementById((marker.title.split(" ")[0]).toString()) == null){
			  infowindow.marker = marker;
			  marker.setAnimation(google.maps.Animation.BOUNCE)
			  infowindow.setContent("<div id=" + marker.title.split(" ")[0] + ">" + responseData + '</div>');
			  infowindow.open(map, marker);
			  // Make sure the marker property is cleared if the infowindow is closed.
			  infowindow.addListener('closeclick',function(){
			    infowindow.setMarker = null;
			  });
			}
  		},
  		failure: function(response){
  			if(document.getElementById((marker.title.split(" ")[0]).toString()) == null){
			  infowindow.marker = marker;
			  marker.setAnimation(google.maps.Animation.BOUNCE)
			  infowindow.setContent("<div id=" + marker.title.split(" ")[0] + ">" + "sorry no info available" + '</div>');
			  infowindow.open(map, marker);
			  // Make sure the marker property is cleared if the infowindow is closed.
			  infowindow.addListener('closeclick',function(){
			    infowindow.setMarker = null;
			  });
			}
  		}
	});
}

// $.ajax("https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts&list=&meta=&titles=Northstar_California&exchars=1200")


$( document ).ready(function() {
	$('.listItem').click(function(){
		var largeInfowindow = new google.maps.InfoWindow();

		for(let i = 0; i < markers.length; i++){
			if(this.innerHTML == markers[i].title){
				populateInfoWindow(markers[i], largeInfowindow);
			}
		}


	})



});








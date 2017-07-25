/*!
 * Start Bootstrap - Grayscale Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery to collapse the navbar on scroll
function collapseNavbar() {
	if ($(".navbar").offset().top > 50) {
		$(".navbar-fixed-top").addClass("top-nav-collapse");
	} else {
		$(".navbar-fixed-top").removeClass("top-nav-collapse");
	}
}

$(window).scroll(collapseNavbar);
$(document).ready(collapseNavbar);

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
	$('a.page-scroll').bind('click', function(event) {
		var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 1500, 'easeInOutExpo');
			event.preventDefault();
		});
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
		$(".navbar-collapse").collapse('hide');
});

// Google Maps Scripts
var map = null;
// When the window has finished loading create our google map below
// google.maps.event.addDomListener(window, 'load', init);
// google.maps.event.addDomListener(window, 'resize', function() {
//     map.setCenter(new google.maps.LatLng(42.8165, 75.5326));
// });

function init() {
		// Basic options for a simple Google Map
		// For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
		var mapOptions = {
				// How zoomed in you want the map to start at (always required)
				zoom: 7,

				// The latitude and longitude to center the map (always required)
				center: new google.maps.LatLng(42.8165, -75.5326), // New York

				// Disables the default Google Maps UI components
				disableDefaultUI: true,
				scrollwheel: false,
				draggable: false,

				// How you would like to style the map.
				// This is where you would paste any style found on Snazzy Maps.
				styles: [
		{
				"featureType": "all",
				"elementType": "geometry",
				"stylers": [
						{
								"color": "#193819"
						},
						{
								"saturation": "-45"
						},
						{
								"lightness": "-14"
						}
				]
		},
		{
				"featureType": "all",
				"elementType": "labels.text.fill",
				"stylers": [
						{
								"gamma": 0.01
						},
						{
								"lightness": 20
						}
				]
		},
		{
				"featureType": "all",
				"elementType": "labels.text.stroke",
				"stylers": [
						{
								"saturation": -31
						},
						{
								"lightness": -33
						},
						{
								"weight": 2
						},
						{
								"gamma": 0.8
						}
				]
		},
		{
				"featureType": "all",
				"elementType": "labels.icon",
				"stylers": [
						{
								"visibility": "off"
						}
				]
		},
		{
				"featureType": "administrative.country",
				"elementType": "labels.text.fill",
				"stylers": [
						{
								"visibility": "simplified"
						}
				]
		},
		{
				"featureType": "administrative.country",
				"elementType": "labels.text.stroke",
				"stylers": [
						{
								"visibility": "off"
						},
						{
								"color": "#ff0000"
						}
				]
		},
		{
				"featureType": "administrative.province",
				"elementType": "labels",
				"stylers": [
						{
								"visibility": "simplified"
						}
				]
		},
		{
				"featureType": "administrative.province",
				"elementType": "labels.text.fill",
				"stylers": [
						{
								"visibility": "on"
						},
						{
								"lightness": "41"
						}
				]
		},
		{
				"featureType": "administrative.locality",
				"elementType": "labels",
				"stylers": [
						{
								"visibility": "simplified"
						},
						{
								"lightness": "18"
						},
						{
								"gamma": "0.84"
						},
						{
								"saturation": "51"
						},
						{
								"hue": "#00ff00"
						}
				]
		},
		{
				"featureType": "landscape",
				"elementType": "geometry",
				"stylers": [
						{
								"lightness": "1"
						},
						{
								"saturation": 30
						}
				]
		},
		{
				"featureType": "poi",
				"elementType": "geometry",
				"stylers": [
						{
								"saturation": 20
						}
				]
		},
		{
				"featureType": "poi",
				"elementType": "labels.text",
				"stylers": [
						{
								"visibility": "simplified"
						}
				]
		},
		{
				"featureType": "poi.park",
				"elementType": "geometry",
				"stylers": [
						{
								"lightness": 20
						},
						{
								"saturation": -20
						}
				]
		},
		{
				"featureType": "poi.park",
				"elementType": "geometry.fill",
				"stylers": [
						{
								"lightness": "-38"
						}
				]
		},
		{
				"featureType": "road",
				"elementType": "all",
				"stylers": [
						{
								"visibility": "off"
						}
				]
		},
		{
				"featureType": "road",
				"elementType": "geometry",
				"stylers": [
						{
								"lightness": 10
						},
						{
								"saturation": -30
						}
				]
		},
		{
				"featureType": "road",
				"elementType": "geometry.stroke",
				"stylers": [
						{
								"saturation": 25
						},
						{
								"lightness": 25
						}
				]
		},
		{
				"featureType": "water",
				"elementType": "all",
				"stylers": [
						{
								"lightness": -20
						}
				]
		}
]
		};

		// Get the HTML DOM element that will contain your map
		// We are using a div with id="map" seen below in the <body>
		var mapElement = document.getElementById('map');

		// Create the Google Map using out element and options defined above
		map = new google.maps.Map(mapElement, mapOptions);

		// Custom Map Marker Icon - Customize the map-marker.png file to customize your icon
		var image = 'img/map-marker.png';
		var myLatLng = new google.maps.LatLng(42.8165, -75.5326);
		var beachMarker = new google.maps.Marker({
				position: myLatLng,
				map: map,
				icon: image
		});
}

const initMap = function () {
	const currentLocation = { lat: 42.8165, lng: 75.5326 };
	const map = new google.maps.Map(document.getElementById('map'), {
		zoom: 4,
		center: currentLocation
	})
	const marker = new google.maps.Marker({
		position: currentLocation,
		map: map
	})
}

module.exports = {
	initMap: initMap
}

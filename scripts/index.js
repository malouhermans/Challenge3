var lat = 0.0;
var long = 0.0;


function geocoder(x){
	var request = 'https://api.opencagedata.com/geocode/v1/json?q='+x+'&key=96119d26deed46a79c7761ce539a8e61'
	fetch(request)
	.then(function(response) {
		return response.json();
	})
	// do something with response
	.then(function(response) {
		// show full JSON object
		console.log(response);
		var data1 = response;
		long = data1.results[0].geometry.lng;
		lat = data1.results[0].geometry.lat;
	});

}


function weerdata() {
	var request = 'http://api.weatherbit.io/v2.0/current?key=b0f43d96f79b42cf909d995e239182e7&lang=nl&lat='+lat+'&lon='+long
	fetch(request)
	.then(function(response) {
		return response.json();
	})
	// do something with response
	.then(function(response) {
		// show full JSON object
		console.log(response);
		var data1 = response;
		console.log(data1.data[0].weather.description);
 		console.log(data1.data[0]);

  		var temperatuur = data1.data[0].temp;
  		var luchtdruk = data1.data[0].pres;
  		var windsnelheid = data1.data[0].wind_spd;
  		var bewolking = data1.data[0].clouds;
		document.getElementById('weer_temperatuur').innerHTML = 'Temperatuur: <br>' + temperatuur + '&#176;C <br>';
		document.getElementById('weer_luchtdruk').innerHTML = 'Luchtdruk: <br>' + luchtdruk;
		document.getElementById('weer_windsnelheid').innerHTML = 'Windsnelheid:<br>' + windsnelheid;
		document.getElementById('weer_bewolking').innerHTML = 'Bewolking:<br>' + bewolking;
	});
}




function map() {
    console.log(lat, long)
	mapboxgl.accessToken = 'pk.eyJ1IjoibWFsb3VoZXJtYW5zIiwiYSI6ImNrOHZqankzbDAwdzQzZ253d2J5YTg0cW0ifQ.Wx143Bhn6wkuImMiCDEGjA';
	var map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/mapbox/streets-v11',
		center: [long, lat],
		zoom: 12 
	});
	console.log(lat, long)
	map.addControl(new mapboxgl.NavigationControl());
};

function nieuwestad() {
    stad = document.getElementById("fname").value;
    geocoder(stad);
    weerdata();
    map();
    console.log(stad);
};


window.onload = function (){
	geocoder('Den Haag');
	weerdata();
	map();
};



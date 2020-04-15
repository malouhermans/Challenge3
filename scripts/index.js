
function geocoder(x) {
    //In de volgende regel wordt een stadsnaam, zoals 'Den Haag', in de requestlink gestopt.
    var request = 'https://api.opencagedata.com/geocode/v1/json?q=' + x + '&key=96119d26deed46a79c7761ce539a8e61';
    //Roep request op
    fetch(request)
    .then(function (response) {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
        // Check verbinding en vertaal response naar JSON.
    })
    .then(function (response) {
        // Laat het volledige json object zien.
        console.log(response);
        var data1 = response;
        // Haal de coordinaten uit de JSON.
        long = data1.results[0].geometry.lng;
        lat = data1.results[0].geometry.lat;
        console.log(lat, long);
        return {lat, long};
    })
    .then((response) => {
        // Gebruik de coordinaten in de weer-API, stel een link samen.
        console.log(this.lat, this.long);
        var request1 = 'https://api.weatherbit.io/v2.0/current?key=b0f43d96f79b42cf909d995e239182e7&lang=nl&lat='+lat+'&lon='+long;
        console.log(request1);
        return request1;
        //Haal het 'weer' op bij de API.
    }).then((response) => fetch(response))
    .then(function (response) {
        //Log de gehele weerresponse en vertaal response naar json
        console.log(response);
        return response.json();
    })
    .then(function(response) {
        //Log de JSON
        console.log(response);
        var data1 = response;
        console.log(data1.data[0].weather.description);
        console.log(data1.data[0]);
        //Haal de weervariabelen op uit de JSON
        var temperatuur = data1.data[0].temp;
        var luchtdruk = data1.data[0].pres;
        var windsnelheid = data1.data[0].wind_spd;
        var bewolking = data1.data[0].clouds;
        var long = data1.data[0].lon;
        var lat = data1.data[0].lat;
        //Koppel de opgehaalde data aan de HTML
        document.getElementById('weer_temperatuur').innerHTML = 'Temperature: <br>' + temperatuur + '&#176;C <br>';
        document.getElementById('weer_luchtdruk').innerHTML = 'Airpressure: <br>' + luchtdruk;
        document.getElementById('weer_windsnelheid').innerHTML = 'Windspeed:<br>' + windsnelheid;
        document.getElementById('weer_bewolking').innerHTML = 'Cloud cover:<br>' + bewolking;
        return { lat, long };
    })
    .then((response) => {
        //Laad de kaart van mapbox, gecentreerd op de stad naar keuze. 
        console.log(this.lat, this.long);
        mapboxgl.accessToken = 'pk.eyJ1IjoibWFsb3VoZXJtYW5zIiwiYSI6ImNrOHZqankzbDAwdzQzZ253d2J5YTg0cW0ifQ.Wx143Bhn6wkuImMiCDEGjA';
        var long = this.long;
        var lat = this.lat;
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [long, lat],
            zoom: 12
        });
        map.on('load', function () {
            map.addSource('points', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': [
                    {
                        // feature for Mapbox DC
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [
                            long,
                            lat
                            ]
                        },
                        'properties': {
                            'title': 'Destination',
                            'icon': 'rocket',
                            'iconSize': 800
                        }
                    },
                    ]
                }
            });
            map.addLayer({
                'id': 'points',
                'type': 'symbol',
                'source': 'points',
                'layout': {
                    // get the icon name from the source's "icon" property
                    // concatenate the name to get an icon from the style's sprite sheet
                    'icon-image': ['concat', ['get', 'icon'], '-15'],
                    // get the title name from the source's "title" property
                    'text-field': ['get', 'title'],
                    'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                    'text-offset': [0, 0.6],
                    'text-anchor': 'top'
                }
            });
        });


        
    });
 
  }

//Functie die vanuit de form wordt getriggerd en de stad naar keuze ophaald. 
//Roept Geocoderfunctie aan met stad naar keuze.  
function nieuwestad() {
    stad = document.getElementById("fname").value;
    geocoder(stad);
};

//Functie om de pagina eerst te laden
window.onload = function (){
    geocoder('Den Haag');

};



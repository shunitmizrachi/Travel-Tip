

export const mapService = {
    initMap,
    addMarker,
    panTo
}

var gMap;

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap');
    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            console.log('Map!', gMap);
        })
        .then(() => {
            var infoWindow = new google.maps.InfoWindow({
                content: "Click the map to get Lat/Lng!",
                position: { lat, lng }
            });
            infoWindow.open(gMap);
      
        gMap.addListener("click", (mapsMouseEvent) => {
            // Close the current InfoWindow.
            infoWindow.close();
            // Create a new InfoWindow.
            infoWindow = new google.maps.InfoWindow({
              position: mapsMouseEvent.latLng,
            });
            infoWindow.setContent(
              JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
            );
            infoWindow.open(gMap);
          });

        })
        .then(() => {
            gMap.addListener('click', ({ latLng }) => {
                const name = prompt('Give name')
                const pos = {
                    name,
                    coords: {
                        lat: latLng.lat(),
                        lng: latLng.lng()
                    }
                }
<<<<<<< HEAD
                // onAddPlace(pos)
                // renderPlaces()
=======
                onAddPlace(pos)
>>>>>>> e2c23182072388379ee3e83214ed6ece21f20f37
                gMap.setCenter(pos.coords);
                console.log(pos)
            })
        })
}



function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    });
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
}



function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyBDOoiFFGSeIYY1Cgon8OTLv-kiluzSie8'; //TODO: Enter your API Key
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}





  
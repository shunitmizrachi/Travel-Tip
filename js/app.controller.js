import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit;
window.onSearch = onSearch;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.onDeleteLoc = onDeleteLoc;

function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready');
        })
        .catch(() => console.log('Error: cannot init map'));
        onGetLocs()
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    console.log('Adding a marker');
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            // console.log('Locations:', locs)
            // document.querySelector('.locs').innerText = JSON.stringify(locs)
            renderLocs(locs)
        })
}

function renderLocs(locs) {
    locService.getLocs()
    const elLocs = document.querySelector('.locs')
    var strHTMLs = locs.map(loc => {
        return `<tr>
        <td>${loc.name}</td>
        <td>${loc.lat}</td>
        <td>${loc.lng}</td>
        <td><button onclick="">Go</button></td>
        <td><button onclick="onDeleteLoc('${loc.id}')">Delete</button></td>
    </tr>`
    })
    elLocs.innerHTML = strHTMLs.join('');
    
}

function onDeleteLoc(locationId) {
console.log(locationId)
locService.deleteLoc(locationId)
onGetLocs()
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            mapService.initMap(pos.coords.latitude, pos.coords.longitude)
            console.log('User position is:', pos.coords);
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}
function onPanTo() {
    console.log('Panning the Map');
    mapService.panTo(35.6895, 139.6917);
}

function onSearch(ev) {
    if (ev) ev.preventDefault();
    const searchValue = document.querySelector('input[name=search]').value;
    console.log(searchValue)
    locService.getSearchLocation(searchValue)
    .then ((locs) => mapService.panTo(locs.lat, locs.lng))
}




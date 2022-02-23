import { storageService } from './storage.service.js'
import { utilService } from './util.service.js'

export const locService = {
    getLocs,
    addLoc,
    deleteLoc,
    getSearchLocation
}

const KEY = 'locsDB'


const locs = storageService.load(KEY) || [
    { id: 'aU15', name: 'Greatplace', lat: 32.047104, lng: 34.832384 }, 
    { id: 'Ev97', name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}


function addLoc(name, lat, lng) {
    var loc = {
        id: utilService.makeId(),
        name: '',
        lat: '',
        lng: '',
    }

    locs.push(loc)
    storageService.save(KEY, locs)

}


function deleteLoc(id) {
    var deleteLocIdx = locs.findIndex((loc) => loc.id === id)
    locs.splice(deleteLocIdx, 1)
    storageService.save(KEY, locs)
}

function getSearchLocation(value){
    const GEO_API_KEY = 'AIzaSyAIywOXkhdxDt533AX9FL_CCNhCAptnsJU'
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${value}&key=${GEO_API_KEY}`)
    .then(res => res.data.results[0].geometry.location)
}
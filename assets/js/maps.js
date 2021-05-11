let currentMap;

function initMaps() {
    initMap();
    initializeBudapest();
    initializeKeszthely();
    initializeSiofok();
    initializePecs();
}



//Initialisation of initmap located in index.html
function initMap() {
    let map = new google.maps.Map(document.getElementById("mapDestinations"), {
        zoom: 7,
        center: { 
            lat: 47.497913, 
            lng: 19.040236
        }
    });

    let infowindow = new google.maps.InfoWindow({
        content: ""
    });

    let labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let locations = [
        {  lat: 47.496717,  lng: 19.013397 },
        {  lat: 46.0751089, lng: 18.2261525 },
        {  lat: 46.9019145, lng: 18.0447842 },
        {  lat: 46.7498531, lng: 17.1719147 }
    ];
    
    let markerLocations = [
        { name: "Budapest", lat: 47.496717,  lng: 19.013397, description: "<strong>Budapest:</strong><br>Hungary's capital city, click on the red marker to learn more about Budapest.", url: "budapest.html" },
        { name: "Pécs", lat: 46.0751089, lng: 18.2261525, description: "<strong>Pécs:</strong><br>Perfect for a city break, click on the red marker to learn more.", url: "pecs.html" },
        { name: "Siofok", lat: 46.9019145, lng: 18.0447842, description: "<strong>Siófok:</strong><br>A small town with a big history, click on the red marker to learn more.", url: "siofok.html" },
        { name: "Keszthely", lat: 46.7498531, lng: 17.1719147, description: "<strong>Keszthely:</strong><br>Hungary's lakeside retreat, click on the red marker to learn more.", url: "keszthely.html" }
    ];
      
    for (let i = 0; i < markerLocations.length; i++) {
        let marker = new google.maps.Marker({
            position: { lat: markerLocations[i].lat, lng: markerLocations[i].lng},
            map,
            animation: google.maps.Animation.DROP,
            title: "",
            url: markerLocations[i].url,
            label: labels[i % labels.length]
        });

        bindInfoWindow(marker, map, infowindow, markerLocations[i].description);

        google.maps.event.addListener(marker, "click", function() {
            window.location.href = marker.url;
        });
    }
}

function bindInfoWindow(marker, map, infowindow, description){
    marker.addListener("mouseover", function() {
        infowindow.setContent(description);
        infowindow.open(map, this);
    });

    marker.addListener("mouseout", function() {
        infowindow.close();
    })
}

//This code snippet was sourced from a Google CodeLabs tutorial 'Build a nearby business search service with Google Maps Platform - Show Place Details on Demand'.//
//https://developers.google.com/codelabs/maps-platform/google-maps-nearby-search-js#4 //
let infoPane;
let infowindow;
let currentInfoWindow;

//End of code snippet//

var budapestMarkers = { 'restaurant':[], 'bar':[], 'lodging':[], 'tourist_attraction':[], 'department_store':[], }

//Initialisation of map located on budapest.html
function initializeBudapest() {
    let budapest = new google.maps.LatLng(47.4985097, 19.0485491);
    mapBudapest = new google.maps.Map(document.getElementById("mapBudapest"), {
        zoom: 14,
        center: budapest
    });

    //Elements of this code was sourced from a Google CodeLabs tutorial 'Build a nearby business search service with Google Maps Platform - Show Place Details on Demand'.//
    //https://developers.google.com/codelabs/maps-platform/google-maps-nearby-search-js#4 //

    infoPane = document.getElementById('panel');
    currentMap = mapBudapest;
    infowindow = new google.maps.InfoWindow;
    currentInfoWindow = infowindow;

    //End of sourced code//

    let request = {
        location: budapest,
        radius: '8046',
        type: ['restaurant', 'tourist_attraction', 'bar', 'department_store', 'lodging']
    };

    let types = ["restaurant", "tourist_attraction", "bar", "department_store", "lodging"];

    service = new google.maps.places.PlacesService(mapBudapest);
    service.textSearch(request, callback);

    function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (let i = 0; i < types.length; i++) {
                for (let j = 0; j < results.length; j++) {
                    let place = results[j]
                    budapestMarkers[request.type[i]].push(createMarker(results[j]));
                }
            }
            
            mapBudapest.setCenter(results[0].geometry.location);
        }
    }
}

//Initialisation of map located on keszthely.html

var keszthelyMarkers = { 'restaurant':[], 'bar':[], 'lodging':[], 'tourist_attraction':[], 'department_store':[], }

function initializeKeszthely() { 
    let keszthely = new google.maps.LatLng(46.7498531, 17.1719147);
    mapKeszthely = new google.maps.Map(document.getElementById("mapKeszthely"), {
        zoom: 14,
        center: keszthely
    });

    //Elements of this code was sourced from a Google CodeLabs tutorial 'Build a nearby business search service with Google Maps Platform - Show Place Details on Demand'.//
    //https://developers.google.com/codelabs/maps-platform/google-maps-nearby-search-js#4 //

    infoPane = document.getElementById('panel');
    currentMap = mapKeszthely;
    infowindow = new google.maps.InfoWindow;
    currentInfoWindow = infowindow;
    
    //End of sourced code//

    let request = {
        location: keszthely,
        radius: '8046',
        type: ['restaurant', 'tourist_attraction', 'bar', 'department_store', 'lodging']
    };

    let types = ["restaurant", "tourist_attraction", "bar", "department_store", "lodging"];
    
    service = new google.maps.places.PlacesService(mapKeszthely);
    service.textSearch(request, callback);

    function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (let i = 0; i < types.length; i++) {
                for (let j = 0; j < results.length; j++) {
                    let place = results[j];
                    keszthelyMarkers[request.type[i]].push(createMarker(results[j]));
                }
            }
            mapKeszthely.setCenter(results[0].geometry.location);
        }
    } 
} 

//Initialisation of map located on siofok.html
var siofokMarkers = { 'restaurant':[], 'bar':[], 'lodging':[], 'tourist_attraction':[], 'department_store':[], }

function initializeSiofok() {  
    let siofok = new google.maps.LatLng(46.9019145, 18.0447842);
    mapSiofok = new google.maps.Map(document.getElementById("mapSiofok"), {
        zoom: 13,
        center: siofok
    });

    //Elements of this code was sourced from a Google CodeLabs tutorial 'Build a nearby business search service with Google Maps Platform - Show Place Details on Demand'.//
    //https://developers.google.com/codelabs/maps-platform/google-maps-nearby-search-js#4 //

    infoPane = document.getElementById('panel');
    currentMap = mapSiofok;
    infowindow = new google.maps.InfoWindow;
    currentInfoWindow = infowindow;

    //End of sourced code//

    let request = {
        location: siofok,
        radius: '8046',
        type: ['restaurant', 'tourist_attraction', 'bar', 'department_store', 'lodging']
    };

    let types = ["restaurant", "tourist_attraction", "bar", "department_store", "lodging"];

    service = new google.maps.places.PlacesService(mapSiofok);
    service.textSearch(request, callback);

    function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (let i = 0; i < types.length; i++) {
                for (let j = 0; j < results.length; j++) {
                     let place = results[j];
                    siofokMarkers[request.type[i]].push(createMarker(results[j]));
                }
            }
            mapSiofok.setCenter(results[0].geometry.location);
        }
    }
} console.log(siofokMarkers);

//Initialisation of map located on pecs.html
var pecsMarkers = { 'restaurant':[], 'bar':[], 'lodging':[], 'tourist_attraction':[], 'department_store':[], }

function initializePecs() {  
    let pecs = new google.maps.LatLng(46.0751089, 18.2261525);
    mapPecs = new google.maps.Map(document.getElementById("mapPecs"), {
        zoom: 14,
        center: pecs
    });

    //Elements of this code was sourced from a Google CodeLabs tutorial 'Build a nearby business search service with Google Maps Platform - Show Place Details on Demand'.//
    //https://developers.google.com/codelabs/maps-platform/google-maps-nearby-search-js#4 //

    infoPane = document.getElementById('panel');
    currentMap = mapPecs;
    infowindow = new google.maps.InfoWindow;
    currentInfoWindow = infowindow;

    //End of sourced code//

    let request = {
        location: pecs,
        radius: '8046',
        type: ['restaurant', 'tourist_attraction', 'bar', 'department_store', 'lodging']
    };

    let types = ["restaurant", "tourist_attraction", "bar", "department_store", "lodging"];

    service = new google.maps.places.PlacesService(mapPecs);
    service.textSearch(request, callback);

    function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (let i = 0; i < types.length; i++) {
                for (let j = 0; j < results.length; j++) {
                    let place = results[j];
                    pecsMarkers[request.type[i]].push(createMarker(results[j]));
                }  
            }
            mapPecs.setCenter(results[0].geometry.location);
        }
    }
}

function createMarker(results) {
    let marker = new google.maps.Marker({
        currentMap,
        position: results.geometry.location,
    });
    marker.setMap(currentMap);

    //This code snippet was sourced from a Google CodeLabs tutorial 'Build a nearby business search service with Google Maps Platform - Show Place Details on Demand'.//
    //https://developers.google.com/codelabs/maps-platform/google-maps-nearby-search-js#4  - Slight alterations have been made for it to fit the purposes of this site.//

    google.maps.event.addListener(marker, 'click', () => {
        let request = {
            placeId: results.place_id,
            fields: ['name', 'formatted_address', 'geometry', 'rating', 'website', 'photos']
        };

        service.getDetails(request, (placeResult, status) => {
            showDetails(placeResult, marker, status)
        });
    });
    return marker;
}

function showDetails(placeResult, marker, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        let placeInfowindow = new google.maps.InfoWindow();
        let rating = "None";
        if (placeResult.rating) rating = placeResult.rating;
        placeInfowindow.setContent('<div><strong>' + placeResult.name +
          '</strong><br>' + 'Rating: ' + rating + '</div>');
        placeInfowindow.open(marker.map, marker);
        currentInfoWindow.close();
        currentInfoWindow = placeInfowindow;
        showPanel(placeResult);
      } else {
        console.log('showDetails failed: ' + status);
    }

    function showPanel(placeResult) {
        while (infoPane.lastChild) {
            infoPane.removeChild(infoPane.lastChild);
        }

        if (placeResult.photos) {
            let firstPhoto = placeResult.photos[0];
            let photo = document.createElement('img');
            photo.classList.add('hero');
            photo.src = firstPhoto.getUrl();
            infoPane.appendChild(photo);
        }

        infoPane.classList.add("open");
    }

    let name = document.createElement('h1');
    name.classList.add('place');
    name.textContent = placeResult.name;
    infoPane.appendChild(name);
    if (placeResult.rating) {
        let rating = document.createElement('p');
        rating.classList.add('details');
        rating.textContent = `Rating: ${placeResult.rating} \u272e`;
        infoPane.appendChild(rating);
    }
    let address = document.createElement('p');
    address.classList.add('details');
    address.textContent = placeResult.formatted_address;
    infoPane.appendChild(address);
    if (placeResult.website) {
        let websitePara = document.createElement('p');
        let websiteLink = document.createElement('a');
        websiteLink.classList.add('panel-link');
        let websiteUrl = document.createTextNode(placeResult.website);
        websiteLink.appendChild(websiteUrl);
        websiteLink.title = placeResult.website;
        websiteLink.href = placeResult.website;
        websitePara.appendChild(websiteLink);
        infoPane.appendChild(websitePara);
    }
}
//End of Google CodeLabs code snippet//

function toggleGroup(type) {
    for (let i = 0; i < budapestMarkers.length; i++) {
        let marker = budapestMarkers[type][i];
        if (marker.getVisible()) {
            marker.setVisible(true);
        } else {
            marker.setVisible(false);
        }
    }

}



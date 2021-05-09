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

//Initialisation of map located on budapest.html
let infowindow;
var budapestMarkers = { 'restaurant':[], 'bar':[], 'lodging':[], 'tourist_attraction':[], 'department_store':[], }

function initializeBudapest() {
    let budapest = new google.maps.LatLng(47.4985097, 19.0485491);
    mapBudapest = new google.maps.Map(document.getElementById("mapBudapest"), {
        zoom: 14,
        center: budapest
    });

    currentMap = mapBudapest;
    infowindow = new google.maps.InfoWindow({
        content: ""
    });

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

    currentMap = mapKeszthely;
    infowindow = new google.maps.InfoWindow({
        content: ""
    });
    
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

    currentMap = mapSiofok;
    infowindow = new google.maps.InfoWindow({
        content: ""
    });

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
}

//Initialisation of map located on pecs.html
var pecsMarkers = { 'restaurant':[], 'bar':[], 'lodging':[], 'tourist_attraction':[], 'department_store':[], }

function initializePecs() {  
    let pecs = new google.maps.LatLng(46.0751089, 18.2261525);
    mapPecs = new google.maps.Map(document.getElementById("mapPecs"), {
        zoom: 14,
        center: pecs
    });

    currentMap = mapPecs;
    infowindow = new google.maps.InfoWindow({
        content: ""
    });

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
    google.maps.event.addListener(marker, "mouseover", () => {
        let content = results.name + '<br>' +
                      results.formatted_address + '<br>' +
                      results.rating + '<br>';
        infowindow.setContent(content);
        infowindow.open(currentMap, marker);
    });
    google.maps.event.addListener(marker, "mouseout", function () {
        infowindow.close();
    })
    return marker;
}

function toggleGroup(type) {
    for (let i = 0; i < budapestMarkers(request.type[0]).length; i++) {
        let marker = budapestMarkers[request.type][i];
        if (marker.getVisible()) {
            marker.setVisible(true);
        }else {
            marker.setVisible(false);
        }
    }
}
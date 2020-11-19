function initMaps() {
    initMap();
    initializeBudapest();
    initializeKeszthely();
    initializeSiofok();
    initPecsMap();
    
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

    let labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let locations = [
        {  lat: 47.496717,  lng: 19.013397 },
        {  lat: 46.0751089, lng: 18.2261525 },
        {  lat: 46.9019145, lng: 18.0447842 },
        {  lat: 46.7498531, lng: 17.1719147 }
    ];
    
    let markerLocations = [
        { name: "Budapest", lat: 47.496717,  lng: 19.013397, url: "budapest.html" },
        { name: "Pécs", lat: 46.0751089, lng: 18.2261525, url: "pecs.html" },
        { name: "Siofok", lat: 46.9019145, lng: 18.0447842, url: "siofok.html" },
        { name: "Keszthely", lat: 46.7498531, lng: 17.1719147, url: "keszthely.html" }
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

        google.maps.event.addListener(marker, "click", function() {
            window.location.href = marker.url;
        });
    }
}

//Initialisation of map located on budapest.html
let infowindow;

function initializeBudapest() {
    console.log("BudapestMap")
    let budapest = new google.maps.LatLng(47.4985097, 19.0485491);
    infowindow = new google.maps.InfoWindow();
    mapBudapest = new google.maps.Map(document.getElementById("mapBudapest"), {
        zoom: 14,
        center: budapest
    });

    /*let request = {
        location: budapest,
        radius: '8046',
        type: ['restaurant']
    };*/

    let request1 = {
        location: budapest,
        radius: '8046',
        type: ['tourist_attraction']
    };

    let request2 = {
        location: budapest,
        radius: '8046',
        type: ['department_store']
    };

    let request3 = {
        location: budapest,
        radius: '8046',
        type: ['room']
    };

    service = new google.maps.places.PlacesService(mapBudapest);
    service.textSearch(request1, callback);



}

function callback(results, status) {
    console.log(results)
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
            let place = results[i];
            createMarker(results[i]);
            console.log(results[i]);
        }
        mapBudapest.setCenter(results[0].geometry.location);
    }
}

function createMarker(results){
    
    let marker = new google.maps.Marker({
        mapBudapest,
        position: results.geometry.location,
    });
    marker.setMap(mapBudapest);
    google.maps.event.addListener(marker, "click", () => {
        infowindow.setContent(results.name);
        infowindow.open(mapBudapest);
    });
}

//Initialisation of map located on keszthely.html
function initializeKeszthely() {  
    let keszthely = new google.maps.LatLng(46.7498531, 17.1719147);
    infowindow = new google.maps.InfoWindow();
    mapKeszthely = new google.maps.Map(document.getElementById("mapKeszthely"), {
        zoom: 14,
        center: keszthely
    });

    let request = {
        location: keszthely,
        radius: '8046',
        type: ['restaurant']
    };

    /*let request1 = {
        location: keszthely,
        radius: '8046',
        type: ['tourist_attraction']
    };

    let request2 = {
        location: keszthely,
        radius: '8046',
        type: ['department_store']
    };

    let request3 = {
        location: keszthely,
        radius: '8046',
        type: ['room']
    };*/

    service = new google.maps.places.PlacesService(mapKeszthely);
    service.textSearch(request, callback);
}

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i <results.length; i++) {
            let place = results[i];
            createMarker(results[i]);
        }
        mapKeszthely.setCenter(results[0].geometry.location);
    }
}

function createMarker(results) {
    let marker = new google.maps.Marker({
        mapKeszthely,
        position: results.geometry.location,
    });
    marker.setMap(mapKeszthely);
    google.maps.event.addListener(marker, "click", () => {
        infowindow.setContent(results.name);
        infowindow.open(mapKeszthely)
    });
}

//Initialisation of map located on siofok.html
function initializeSiofok() {  
    let siofok = new google.maps.LatLng(46.9019145, 18.0447842);
    infowindow = new google.maps.InfoWindow();
    mapSiofok = new google.maps.Map(document.getElementById("mapSiofok"), {
        zoom: 13,
        center: siofok
    });

    let request = {
        location: siofok,
        radius: '8046',
        type: ['restaurant']
    };

    /*let request1 = {
        location: siofok,
        radius: '8046',
        type: ['tourist_attraction']
    };

    let request2 = {
        location: siofok,
        radius: '8046',
        type: ['department_store']
    };

    let request3 = {
        location: siofok,
        radius: '8046',
        type: ['room']
    };*/

    service = new google.maps.places.PlacesService(mapSiofok);
    service.textSearch(request, callback);
}

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
            let place = results[i];
            createMarker(results[i]);
        }
        mapSiofok.setCenter(results[0].geometry.location);
    }
}

function createMarker(results) {
    let marker = new google.maps.Marker({
        mapSiofok,
        position: results.geometry.location,
    });
    marker.setMap(mapSiofok);
    google.maps.event.addListener(marker, "click", () => {
        infowindow.setContent(results.name);
        infowindow.open(mapSiofok)
    });
}
//Initialisation of map located on pecs.html
function initPecsMap() {  
    let mapPecs = new google.maps.Map(document.getElementById("mapPecs"), {
        zoom: 12,
        center: { 
           lat: 46.0751089,
           lng: 18.2261525
        }
    });
}


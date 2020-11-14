function initMaps() {
    initMap();
    initializeBudapest(); 
    initKeszthelyMap();
    initSiofokMap();
    initPecsMap();
    
}


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

let infowindow;

function initializeBudapest() {
    console.log("BudapestMap")
    let budapest = new google.maps.LatLng(47.4985097, 19.0485491);
    infowindow = new google.maps.InfoWindow();
    mapBudapest = new google.maps.Map(document.getElementById("mapBudapest"), {
        zoom: 14,
        center: budapest
    });

    let request = {
        location: budapest,
        radius: '8046',
        query: 'restaurant'
    };

    service = new google.maps.places.PlacesService(mapBudapest);
    service.textSearch(request, callback);
    
}



function callback(results, status) {
    console.log(results)
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
            let place = results[i];
            createMarker(results[i]);
            console.log(results[i]);
        }
       
    }
}

function createMarker(results){
    
    let marker = new google.maps.Marker({
        mapBudapest,
        position: {lat: 47.4985097, lng: 19.0485491},
    });
    marker.setMap(mapBudapest);
    google.maps.event.addListener(marker, "click", () => {
        infowindow.setContent(results.name);
        infowindow.open(mapBudapest);
    });
}


function initKeszthelyMap() {  
    let mapKeszthely = new google.maps.Map(document.getElementById("mapKeszthely"), {
        zoom: 12,
        center: { 
            lat: 46.7498531,
            lng: 17.1719147
        }
    });
}

function initSiofokMap() {  
    let mapSiofok = new google.maps.Map(document.getElementById("mapSiofok"), {
        zoom: 13,
        center: { 
           lat: 46.9019145,
           lng: 18.0447842
        }
    });
}

function initPecsMap() {  
    let mapPecs = new google.maps.Map(document.getElementById("mapPecs"), {
        zoom: 12,
        center: { 
           lat: 46.0751089,
           lng: 18.2261525
        }
    });
}


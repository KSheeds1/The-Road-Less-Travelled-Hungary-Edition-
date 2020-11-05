function initMap() {
    let map = new google.maps.Map(document.getElementById("map"), {
        zoom: 7,
        center: { 
            lat: 47.497913, 
            lng: 19.040236
        }
    });

    let labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let locations = [
        { name:"Budapest", lat: 47.496717,  lng: 19.013397, url: "budapest.html"},
        { name: "Pécs", lat: 46.0751089, lng: 18.2261525, url: "pecs.html"},
        { name: "Siofok", lat: 46.9019145, lng: 18.0447842, url: "siofok.html" },
        { name: "Keszthely", lat: 46.7498531, lng: 17.1719147, url: "keszthely.html"}
    ];
    
    let markers = locations.map(function(location, i) {
        let marker = new google.maps.Marker({
            map,
            draggable: false,
            animation: google.maps.Animation.DROP,
            position: location,
            url: locations[i].url,
            label: labels[i % labels.length]
        });
        google.maps.event.addListener(marker, "click", function() {
            window.location.href = this.url;
        });
    });


}

function initMap() {
    let map = new google.maps.Map(document.getElementById("mapBudapest"), {
        zoom: 12,
        center: { 
            lat: 47.496717,  
            lng: 19.013397
        }
    });
}

function initMap() {
    let map = new google.maps.Map(document.getElementById("mapKeszthely"), {
        zoom: 12,
        center: { 
            lat: 46.7498531, 
            lng: 17.1719147
        }
    });
}
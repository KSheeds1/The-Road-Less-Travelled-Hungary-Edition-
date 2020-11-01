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
        { lat: 47.496717, lng: 19.013397 },
        { lat: 46.0751089, lng: 18.2261525 },
        { lat: 46.9019145, lng: 18.0447842 },
        { lat: 46.7498531, lng: 17.1719147 }
    ];

    let markers = locations.map(function(location, i) {
        return new google.maps.Marker({
            map,
            draggable: false,
            animation: google.maps.Animation.DROP,
            position: location,
            label: labels[i % labels.length]
        });
    });

    function drop() {
        clearMarkers();

        for (let i =0; i < locations.length; i++) {
            addMarkerWithTimeout(locations[i], i * 200);
        };
    }

    function addMarkerWithTimeout(position, timeout) {
        window.setTimeout(() => {
            markers.push(
                new google.maps.Marker({
                    position: location,
                    map,
                    animation: google.maps.Animation.DROP,
                })
            );
            
        }, timeout);
    }

    function clearMarkers() {
        for (let i = 0; i <markers.length; i++) {
            markers[i].setMap(null);
        }
        markers = [];
    }
    
}
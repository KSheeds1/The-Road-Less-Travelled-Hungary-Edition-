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
    });
}

//This code snippet was sourced from a Google CodeLabs tutorial 'Build a nearby business search service with Google Maps Platform - Show Place Details on Demand'.//
//https://developers.google.com/codelabs/maps-platform/google-maps-nearby-search-js#4 //
let infoPane;
let infowindow;
let currentInfoWindow;
let autocomplete;
let places;
let service;
let getDetails;
//End of code snippet//


//Initialisation of map located on budapest.html
function initializeBudapest() {
    let budapest = new google.maps.LatLng(47.4985097, 19.0485491);
    mapBudapest = new google.maps.Map(document.getElementById("mapBudapest"), {
        zoom: 14,
        center: budapest,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.LEFT_BOTTOM
        },
        fullscreenControl: true,
        fullscreenControlOptions: {
            position: google.maps.ControlPosition.TOP_LEFT
        }
    });
    
    //Elements of this code was sourced from a Google CodeLabs tutorial 'Build a nearby business search service with Google Maps Platform - Show Place Details on Demand'.//
    //https://developers.google.com/codelabs/maps-platform/google-maps-nearby-search-js#4 //

    infoPane = document.getElementById('panel');
    currentMap = mapBudapest;
    infoWindow = new google.maps.InfoWindow({
        content: document.getElementById("info-content")
    });
    places = new google.maps.places.PlacesService(mapBudapest);
    /*currentInfoWindow = infowindow;*/
    //End of sourced code//
    const options = {
        componentRestrictions: {country: "hungary"},
        types: ["restaurant", "lodging", "bar", "shopping_mall", "tourist_attraction", "establishment"]
    };

    const input = document.getElementById("pac-input");
    const searchBox = new google.maps.places.SearchBox(input);
    mapBudapest.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    const autocomplete = new google.maps.places.Autocomplete(input, options);
    
    currentMap.addListener("bounds_changed", () => {
        searchBox.setBounds(currentMap.getBounds());
    });
    
    let budapestMarkers = [];

    searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();
        console.log(places);

        if (places.length == 0) {
            return;
        }
        budapestMarkers.forEach((marker) => {
            marker.setMap();
        });
        budapestMarkers = [];

        const bounds = new google.maps.LatLngBounds();
        let count = 0;
        places.forEach((place) => {
            if (!place.geometry || !place.geometry.location) {
                console.log("Returned place contains no geometry");
                return;
            }
            const icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25),
            };
            
            budapestMarkers.push(
                new google.maps.Marker({
                    map: mapBudapest,
                    icon,
                    title: place.name,
                    position: place.geometry.location,
                    animation: google.maps.Animation.DROP
                })
            );

            budapestMarkers[count].placeResult = place;

            google.maps.event.addListener(budapestMarkers[count], "click", showInfoWindow);
            google.maps.event.addListener(budapestMarkers[count], "click", () => {
                let request = {
                    placeId: place.place_id,
                    fields: ['name', 'formatted_address', 'geometry', 'rating', 'price_level', 'review', 'website', 'photos']
                };

                service = new google.maps.places.PlacesService(currentMap);
                service.getDetails(request, (placeResult, status) => {
                    showDetails(placeResult, budapestMarkers, status);
                });
            });

            if (place.geometry.viewport) {
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }

            count++;
        });
        mapBudapest.fitBounds(bounds);
    });
}

//Initialisation of map located on keszthely.html
function initializeKeszthely() { 
    let keszthely = new google.maps.LatLng(46.7498531, 17.1719147);
    mapKeszthely = new google.maps.Map(document.getElementById("mapKeszthely"), {
        zoom: 12,
        center: keszthely,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.LEFT_BOTTOM
        },
        fullscreenControl: true,
        fullscreenControlOptions: {
            position: google.maps.ControlPosition.TOP_LEFT
        }
    });

    //Elements of this code was sourced from a Google CodeLabs tutorial 'Build a nearby business search service with Google Maps Platform - Show Place Details on Demand'.//
    //https://developers.google.com/codelabs/maps-platform/google-maps-nearby-search-js#4 //

    infoPane = document.getElementById('panel');
    currentMap = mapKeszthely;
    infoWindow = new google.maps.InfoWindow({
        content: document.getElementById("info-content")
    });    
    places = new google.maps.places.PlacesService(currentMap);
    //End of sourced code//

    const options = {
        componentRestrictions: {country: "hungary"},
        types: ["restaurant", "lodging", "bar", "shopping_mall", "tourist_attraction", "establishment"]
    };

    const input = document.getElementById("pac-input");
    const searchBox = new google.maps.places.SearchBox(input);
    mapKeszthely.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    const autocomplete = new google.maps.places.Autocomplete(input, options);

    currentMap.addListener("bounds_changed", () => {
        searchBox.setBounds(currentMap.getBounds());
    });

    let keszthelyMarkers = [];

    searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();
        console.log(places);

        if (places.length == 0) {
            return;
        }
        keszthelyMarkers.forEach((marker) => {
            marker.setMap();
        });
        keszthelyMarkers = [];

        const bounds = new google.maps.LatLngBounds();
        let count = 0;
        places.forEach((place) => {
            if (!place.geometry || !place.geometry.location) {
                console.log("Returned place contains no geometry");
                return;
            }
            const icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25),
            };
            
            keszthelyMarkers.push(
                new google.maps.Marker({
                    map: mapKeszthely,
                    icon,
                    title: place.name,
                    position: place.geometry.location,
                    animation: google.maps.Animation.DROP
                })
            );

            keszthelyMarkers[count].placeResult = place;

            google.maps.event.addListener(keszthelyMarkers[count], "click", showInfoWindow);
            google.maps.event.addListener(keszthelyMarkers[count], "click", () => {
                let request = {
                    placeId: place.place_id,
                    fields: ['name', 'formatted_address', 'geometry', 'rating', 'price_level', 'review', 'website', 'photos']
                };

                service = new google.maps.places.PlacesService(currentMap);
                service.getDetails(request, (placeResult, status) => {
                    showDetails(placeResult, keszthelyMarkers, status);
                });
            });

            if (place.geometry.viewport) {
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }

            count++;
        });
       currentMap.fitBounds(bounds);
    });
} 

//Initialisation of map located on siofok.html
function initializeSiofok() {  
    let siofok = new google.maps.LatLng(46.9019145, 18.0447842);
    mapSiofok = new google.maps.Map(document.getElementById("mapSiofok"), {
        zoom: 13,
        center: siofok,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.LEFT_BOTTOM
        },
        fullscreenControl: true,
        fullscreenControlOptions: {
            position: google.maps.ControlPosition.TOP_LEFT
        }
    });

    //Elements of this code was sourced from a Google CodeLabs tutorial 'Build a nearby business search service with Google Maps Platform - Show Place Details on Demand'.//
    //https://developers.google.com/codelabs/maps-platform/google-maps-nearby-search-js#4 //

    infoPane = document.getElementById('panel');
    currentMap = mapSiofok;
    infoWindow = new google.maps.InfoWindow({
        content: document.getElementById("info-content")
    });
    places = new google.maps.places.PlacesService(currentMap);
    //End of sourced code//

    const options = {
        componentRestrictions: {country: "hungary"},
        types: ["restaurant", "lodging", "bar", "shopping_mall", "tourist_attraction", "establishment"]
    };

    const input = document.getElementById("pac-input");
    const searchBox = new google.maps.places.SearchBox(input);
    mapSiofok.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    const autocomplete = new google.maps.places.Autocomplete(input, options);

    currentMap.addListener("bounds_changed", () => {
        searchBox.setBounds(currentMap.getBounds());
    });

    let siofokMarkers = [];

    searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();
        console.log(places);

        if (places.length == 0) {
            return;
        }
        siofokMarkers.forEach((marker) => {
            marker.setMap();
        });
        siofokMarkers = [];

        const bounds = new google.maps.LatLngBounds();
        let count = 0;
        places.forEach((place) => {
            if (!place.geometry || !place.geometry.location) {
                console.log("Returned place contains no geometry");
                return;
            }
            const icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25),
            };
            
            siofokMarkers.push(
                new google.maps.Marker({
                    map: mapSiofok,
                    icon,
                    title: place.name,
                    position: place.geometry.location,
                    animation: google.maps.Animation.DROP
                })
            );

            siofokMarkers[count].placeResult = place;

            google.maps.event.addListener(siofokMarkers[count], "click", showInfoWindow);
            google.maps.event.addListener(siofokMarkers[count], "click", () => {
                let request = {
                    placeId: place.place_id,
                    fields: ['name', 'formatted_address', 'geometry', 'rating', 'price_level', 'review', 'website', 'photos']
                };

                service = new google.maps.places.PlacesService(currentMap);
                service.getDetails(request, (placeResult, status) => {
                    showDetails(placeResult, siofokMarkers, status);
                });
            });

            if (place.geometry.viewport) {
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }

            count++;
        });
        currentMap.fitBounds(bounds);
    });
}

//Initialisation of map located on pecs.html
function initializePecs() {  
    let pecs = new google.maps.LatLng(46.0751089, 18.2261525);
    mapPecs = new google.maps.Map(document.getElementById("mapPecs"), {
        zoom: 14,
        center: pecs,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.LEFT_BOTTOM
        },
        fullscreenControl: true,
        fullscreenControlOptions: {
            position: google.maps.ControlPosition.TOP_LEFT
        }
    });

    //Elements of this code was sourced from a Google CodeLabs tutorial 'Build a nearby business search service with Google Maps Platform - Show Place Details on Demand'.//
    //https://developers.google.com/codelabs/maps-platform/google-maps-nearby-search-js#4 //

    infoPane = document.getElementById('panel');
    currentMap = mapPecs;
    infoWindow = new google.maps.InfoWindow({
        content: document.getElementById("info-content")
    });
    places = new google.maps.places.PlacesService(currentMap);  
    //End of sourced code//

    const options = {
        componentRestrictions: {country: "hungary"},
        types: ["restaurant", "lodging", "bar", "shopping_mall", "tourist_attraction", "establishment"]
    };

    const input = document.getElementById("pac-input");
    const searchBox = new google.maps.places.SearchBox(input);
    mapPecs.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    const autocomplete = new google.maps.places.Autocomplete(input, options);

    currentMap.addListener("bounds_changed", () => {
        searchBox.setBounds(currentMap.getBounds());
    });

    let pecsMarkers = [];

    searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();
        console.log(places);

        if (places.length == 0) {
            return;
        }
        pecsMarkers.forEach((marker) => {
            marker.setMap();
        });
        pecsMarkers = [];

        const bounds = new google.maps.LatLngBounds();
        let count = 0;
        places.forEach((place) => {
            if (!place.geometry || !place.geometry.location) {
                console.log("Returned place contains no geometry");
                return;
            }
            const icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25),
            };
            
            pecsMarkers.push(
                new google.maps.Marker({
                    map: mapPecs,
                    icon,
                    title: place.name,
                    position: place.geometry.location,
                    animation: google.maps.Animation.DROP
                })
            );

            pecsMarkers[count].placeResult = place;

            google.maps.event.addListener(pecsMarkers[count], "click", showInfoWindow);
            google.maps.event.addListener(pecsMarkers[count], "click", () => {
                let request = {
                    placeId: place.place_id,
                    fields: ['name', 'formatted_address', 'geometry', 'rating', 'price_level', 'review', 'website', 'photos']
                };

                service = new google.maps.places.PlacesService(currentMap);
                service.getDetails(request, (placeResult, status) => {
                    showDetails(placeResult, pecsMarkers, status);
                });
            });

            if (place.geometry.viewport) {
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }

            count++;
        });
        currentMap.fitBounds(bounds);
    });
}


//This code was sourced from a Stack OverFlow question and altered to fit the purpose of this site.// 
//https://stackoverflow.com/questions/44225974/how-can-i-add-info-window-in-places-searchbox//
function showInfoWindow() {
    let marker = this;
    places.getDetails({placeId: marker.placeResult.place_id},
    function(place, status) {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
            return;
        }
        infoWindow.open(currentMap, marker);
        buildIWContent(place);
    });
}

function buildIWContent(place) {
    document.getElementById('iw-icon').innerHTML = '<img class="hotelIcon" ' + 'src="' + place.icon + '"/>';
    document.getElementById('iw-url').innerHTML = '<b><a href="' + place.url +'">' + place.name + '</a></b>';
    document.getElementById('iw-address').textContent = place.formatted_address;

    if (place.formatted_phone_number) {
        document.getElementById('iw-phone-row').style.display = '';
        document.getElementById('iw-phone').textContent = place.formatted_phone_number;
    } else {
        document.getElementById('iw-phone-row').style.display = 'none';
    }

    if (place.rating) {
        var ratingHtml = '';
        for (let i = 0; i < 5; i++) {
            if (place.rating < (i + 0.5)) {
                ratingHtml += '&#10025;';
            } else {
                ratingHtml += '&#10029;'; 
            }
            document.getElementById('iw-rating-row').style.display = '';
            document.getElementById('iw-rating').innerHTML = ratingHtml;
        }
    } else {
        document.getElementById('iw-rating-row').style.display = 'none';
    }
}    

 //This code snippet was sourced from a Google CodeLabs tutorial 'Build a nearby business search service with Google Maps Platform - Show Place Details on Demand'.//
 //https://developers.google.com/codelabs/maps-platform/google-maps-nearby-search-js#4  - Slight alterations have been made for it to fit the purposes of this site.//

function showDetails(placeResult, marker, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        showPanel(placeResult);
      } else {
        console.log('showDetails failed: ' + status);
    }

    function showPanel(placeResult) {
        if (infoPane.classList.contains("open")) {
            infoPane.classList.remove("open");
        }
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
    if (placeResult.price_level) {
        let price_level = document.createElement('p');
        price_level.classList.add('details');
        price_level.textContent = `Price-level: ${placeResult.price_level}`;
        infoPane.appendChild(price_level);
    }
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
    if (placeResult.reviews) {
        let reviewHeading = document.createElement('h1');
        reviewHeading.classList.add('place');
        let reviewHeadingText = document.createTextNode("Reviews:");
        reviewHeading.appendChild(reviewHeadingText);
        infoPane.appendChild(reviewHeading);
        for (let i = 0; i < placeResult.reviews.length; i++) {
            let author_name = placeResult.reviews[i].author_name;
            let text = placeResult.reviews[i].text;
            let rating = placeResult.reviews[i].rating;
            let reviews = document.createElement('p');
            reviews.classList.add('details');
            reviews.textContent = `${placeResult.reviews[i].author_name}:  ${placeResult.reviews[i].text} Rating: ${placeResult.reviews[i].rating} `;
            infoPane.appendChild(reviews);    
        }
        
    }
}
//End of Google CodeLabs code snippet//





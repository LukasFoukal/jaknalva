var lat;
var long;

// design variables that need to be changed here
var filterColor = "gold";
var filterColorActive = "goldenrod";
var locationColor = "gold";
var locationColorActive = "goldenrod";

// default setting that runs on load (currently loads GPS position) and removes all filters (not sure if necessary)
navigator.geolocation.getCurrentPosition(loadPosition)
unfilter();

// functions for changing location

function loadPosition(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    loadItUp();
    
    locationButtonActive("myLocation");
}

function loadItUp() {
    var elements = document.getElementById("main").childElementCount;

    for (let i = 0; i < elements; i++) {
        var content = document.getElementById(i);
        var deltaLat = Number(content.dataset.lat) - Number(lat);
        var deltaLong = Number(content.dataset.long) - Number(long);
        var dist = Math.round(Math.sqrt(Math.pow(deltaLat * 110500, 2) + Math.pow(deltaLong * 73000, 2)));

        content.dataset.dist = dist;
        label = content.querySelector('.label');
        label.innerHTML = dist;
    }

    var swaps = 1;
    while (swaps != 0) {
        swaps = 0;
        for (let i = 0; i < elements - 1; i++) {
            var content = document.getElementById(i);
            var next = document.getElementById(i+1);
            var parent = content.parentNode;

            if (Number(next.dataset.dist) < Number(content.dataset.dist)) {  
                parent.insertBefore(next, content);
                content.id = i + 1;
                next.id = i;
                swaps++;
            }
        }
    }
}

function locationButtonActive(location) {
    var locationButtons = document.getElementsByClassName("locationButton");

    for (var i = 0; i < locationButtons.length; i++) {
        if (locationButtons.item(i).id == location) {
            document.getElementById(locationButtons.item(i).id).style.backgroundColor = locationColorActive;
        } else {
            document.getElementById(locationButtons.item(i).id).style.backgroundColor = locationColor;
        }
    }   
}

// fuctions for filtering

function filter(category) {
    var elements = document.getElementById("main").childElementCount;

    for (let i = 0; i < elements; i++) {
        var content = document.getElementById(i);

        if (content.dataset.category.includes(category)) {
            content.style.display = "block";
        } else {
            content.style.display = "none";
        }
    }

    filterButtonActive(category);
}

function unfilter() {
    var elements = document.getElementById("main").childElementCount;

    for (let i = 0; i < elements; i++) {
        var content = document.getElementById(i);

        content.style.display = "block";
    }

    filterButtonActive("all");
}

function filterButtonActive(category) {
    var filterButtons = document.getElementsByClassName("filterButton");

    for (var i = 0; i < filterButtons.length; i++) {
        if (filterButtons.item(i).id == category) {
            document.getElementById(filterButtons.item(i).id).style.backgroundColor = filterColorActive;
        } else {
            document.getElementById(filterButtons.item(i).id).style.backgroundColor = filterColor;
        }
    }   
}
var lat;
var long;

// default setting that runs on load (currently loads GPS position) and removes all filters (not sure if necessary)
navigator.geolocation.getCurrentPosition(loadPosition)

// functions for loading user location
function loadPosition(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    sort();
}

// function for sorting the list
function sort() {
    var elements = document.getElementById("main").childElementCount;

    for (let i = 0; i < elements; i++) {
        var content = document.getElementById("main").children[i];
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
            var content = document.getElementById("main").children[i];
            var next = document.getElementById("main").children[i+1];
            var parent = content.parentNode;

            if (Number(next.dataset.dist) < Number(content.dataset.dist)) {  
                parent.insertBefore(next, content);
                swaps++;
            }
        }
    }
    distCheck();
}

// fuctions for filtering
function filter(category) {
    var elements = document.getElementById("main").childElementCount;

    for (let i = 0; i < elements; i++) {
        var content = document.getElementById("main").children[i];

        if (content.dataset.category.includes(category)) {
            content.style.display = "block";
        } else {
            content.style.display = "none";
        }
    }
}

function unfilter() {
    var elements = document.getElementById("main").childElementCount;

    for (let i = 0; i < elements; i++) {
        var content = document.getElementById("main").children[i];

        content.style.display = "block";
    }
}

// functions for replacing text with current value
function filterChange(newFilter) {
    var filterLabel = document.getElementById("filterLabel");

    filterLabel.innerHTML = newFilter.innerHTML + "<i class=\"dropdownArrow\"></i>";
}

function locationChange(newLocation) {
    var locationLabel = document.getElementById("locationLabel");

    locationLabel.innerHTML = newLocation.innerHTML + "<i class=\"dropdownArrow\"></i>";
}

function adjectiveChange(newAdjective) {
    document.getElementById("verb").innerHTML = newAdjective;
}

// function for displaying or hiding the error message
function distCheck() {
    if (document.getElementById("main").children[0].dataset.dist > 10000 || document.getElementById("main").children[1].dataset.dist == 0) {
        document.getElementById("distWarning").style.display = "block";
    } else {
        document.getElementById("distWarning").style.display = "none";
    }
}
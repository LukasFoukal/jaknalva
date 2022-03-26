var lat;
var long;

// default setting that runs on load (currently loads GPS position) and removes all filters (not sure if necessary)
navigator.geolocation.getCurrentPosition(loadPosition)
unfilter();

// functions for changing location
function loadPosition(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    loadItUp();
}

// function for sorting the list
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

    distCheck();
}

// function for replacing the location text with clicked item
function locationChange(newLocation) {
    var locationLabel = document.getElementById("locationLabel");

    locationLabel.innerHTML = newLocation.innerHTML + " <i class=\"dropdownArrow\"></i>";
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
}

function unfilter() {
    var elements = document.getElementById("main").childElementCount;

    for (let i = 0; i < elements; i++) {
        var content = document.getElementById(i);

        content.style.display = "block";
    }
}

// function for replacing the filter text with clicked item
function filterChange(newFilter) {
    var filterLabel = document.getElementById("filterLabel");

    filterLabel.innerHTML = newFilter.innerHTML + " <i class=\"dropdownArrow\"></i>";
}

// function for expanding and contracting the descriptions
function toggle(box) {
    if (box.getElementsByClassName("description").item(0).style.display == "none") {
        box.getElementsByClassName("description").item(0).style.display = "block";
        box.getElementsByClassName("arrow").item(0).style.transform = "rotate(-135deg)";
    } else {
        box.getElementsByClassName("description").item(0).style.display = "none";
        box.getElementsByClassName("arrow").item(0).style.transform = "rotate(45deg)";
    }
}

function distCheck() {
    if (document.getElementById("0").dataset.dist > 10000 || document.getElementById("1").dataset.dist == 0) {
        document.getElementById("distWarning").style.display = "block";
    } else {
        document.getElementById("distWarning").style.display = "none";
    }
}

function verbChange(newVerb) {
    document.getElementById("verb").innerHTML = newVerb;
}
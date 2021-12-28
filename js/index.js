var lat;
var long;

var filterColor = "gold";
var filterColorActive = "goldenrod";
var locationColor = "gold";
var locationColorActive = "goldenrod";

navigator.geolocation.getCurrentPosition(loadPosition)
unfilter();

function loadPosition(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    loadItUp();
    document.getElementById("myLocation").style.backgroundColor = locationColorActive;
    document.getElementById("Breclav").style.backgroundColor = locationColor;
    document.getElementById("Valtice").style.backgroundColor = locationColor;
}

function Breclav() {
    lat = 48.7558747;
    long = 16.8901997;
    loadItUp()
    document.getElementById("myLocation").style.backgroundColor = locationColor;
    document.getElementById("Breclav").style.backgroundColor = locationColorActive;
    document.getElementById("Valtice").style.backgroundColor = locationColor;
}

function Valtice() {
    lat = 48.7411361;
    long = 16.7557525;
    loadItUp()
    document.getElementById("myLocation").style.backgroundColor = locationColor;
    document.getElementById("Breclav").style.backgroundColor = locationColor;
    document.getElementById("Valtice").style.backgroundColor = locationColorActive;
}

function loadItUp() {
    var elements = document.getElementById("main").childElementCount;

    for (let j = 0; j < elements; j++) {
        var content = document.getElementById(j);
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

function filter(category) {
    var elements = document.getElementById("main").childElementCount;

    for (let k = 0; k < elements; k++) {
        var content = document.getElementById(k);

        if (content.dataset.category.includes(category)) {
            content.style.display = "block";
        } else {
            content.style.display = "none";
        }
    }
}

function unfilter() {
    var elements = document.getElementById("main").childElementCount;

    for (let l = 0; l < elements; l++) {
        var content = document.getElementById(l);

        content.style.display = "block";
    }

    document.getElementById("all").style.backgroundColor = filterColorActive;
    document.getElementById("Klasika").style.backgroundColor = filterColor;
    document.getElementById("Technik").style.backgroundColor = filterColor;
}

function klasika() {
    document.getElementById("all").style.backgroundColor = filterColor;
    document.getElementById("Klasika").style.backgroundColor = filterColorActive;
    document.getElementById("Technik").style.backgroundColor = filterColor;

    filter("klasika");
}

function technik() {
    document.getElementById("all").style.backgroundColor = filterColor;
    document.getElementById("Klasika").style.backgroundColor = filterColor;
    document.getElementById("Technik").style.backgroundColor = filterColorActive;

    filter("technik");
}
var lat = 48.7558747;
var long = 16.8901997;

loadItUp();



function loadPosition(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    loadItUp();
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

        if (content.dataset.category == category) {
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
}
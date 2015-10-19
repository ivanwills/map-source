/* globals Ractive, RactiveF, _, superagent, L */

(function() {
    var options = {};
    options.el = document.querySelector('#container');
    options.components = {};
    options.computed = {
        feed: function() {
            return !!this.get('pos');
        }
    };
    options.template = '#template';
    options.data = {
        events: true
    };

    _.extend(options.components, RactiveF.components);
    _.extend(options.computed, {
    });

    var ractive = new Ractive(options);

    ractive.on('thing', function(evt) {
    });

    // MAP ...
    //

    var centre = [ -33.785, 151.121 ];
    var box    = [ 0.007, 0.016 ];
    var radius = 0.004;
    var max    = 10;

    var map = L.map('map').setView(centre, 16);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'ivanwills.cifvcpu18233zt5lyrpbtaau4',
        accessToken: 'pk.eyJ1IjoiaXZhbndpbGxzIiwiYSI6ImNpZnZjcHZzNTIyeTF1N2x4YmlveHgyYTMifQ.24HDwqrrCD8E_YHhCvF_kg'
    }).addTo(map);

    var markers = [];
    for ( var i = 0; i < 90; i++ ) {
        markers.push(new Marker({
            centre: centre,
            box   : box,
            map   : map,
            click : function(latLng) {
                console.log(latLng);
                ractive.set('pos', latLng);
            }
        }));
    }

    setInterval(function() {
        for (var i in markers) {
            markers[i].move();
        }
    }, 200);

    setInterval(function() {
        for (var i in markers) {
            var count = 0;
            for (var j in markers) {
                if (i !== j) {
                    var dist = markers[i].dist(markers[j]);
                    if (dist < radius) {
                        count++;
                    }
                }
            }
            if (count > max) {
                markers[i].mark(radius);
            }
            else if (markers[i].isMarked()) {
                markers[i].removeMark();
            }
        }
    }, 500);
})();

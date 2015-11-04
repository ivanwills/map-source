/* globals Ractive, _, Markers, L */

(function() {
    var options = {};
    options.el = document.querySelector('#container');
    options.template = Ractive.parse(options.el.innerHTML);
    options.components = {};
    options.computed = {
        feed: function() {
            return !!this.get('pos');
        },
        twitter: function() {
            this.get('pos');
            var size = Math.floor(Math.random() * 5) % 5;
            var img = [
                'twitter1', 'twitter2',
                'twitter3', 'twitter4', 'twitter5',
                'twitter1', 'twitter2',
                'twitter3', 'twitter4', 'twitter5'
            ];
            var imgs = [];
            for (var i = 0; i < size; i++) {
                imgs.push(img[Math.floor(Math.random() * 10) % 10]);
            }
            console.log(size, imgs);
            return imgs;
        }
    };
    options.data = {
        events: true
    };

    _.extend(options.components, Ractive.components);
    _.extend(options.computed, {
    });

    var ractive = new Ractive(options);

    ractive.on('thing', function(evt) {
    });

    var centre = [ -33.785, 151.121 ];
    var map = L.map('map').setView(centre, 16);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
            '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © ' +
            '<a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'ivanwills.cifvcpu18233zt5lyrpbtaau4',
        accessToken: 'pk.eyJ1IjoiaXZhbndpbGxzIiwiYSI6ImNpZnZjcHZzNTIyeTF1N2x4YmlveHgyYTMifQ.24HDwqrrCD8E_YHhCvF_kg'
    }).addTo(map);

    var markers;
    markers = new Markers(map, centre, ractive);
})();

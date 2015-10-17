/* globals Ractive, RactiveF, _, superagent, L */

(function() {
    var options = {};
    options.el = document.querySelector('#container');
    options.components = {};
    options.computed = {};
    options.template = '#template';
    options.data = {
        events: true
    };

    _.extend(options.components, RactiveF.components);
    _.extend(options.computed, {
    });

    var map = L.map('map').setView([-33.786, 151.121], 16);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'ivanwills.cifvcpu18233zt5lyrpbtaau4',
        accessToken: 'pk.eyJ1IjoiaXZhbndpbGxzIiwiYSI6ImNpZnZjcHZzNTIyeTF1N2x4YmlveHgyYTMifQ.24HDwqrrCD8E_YHhCvF_kg'
    }).addTo(map);

    var marker = L.marker([-33.786, 151.121]).addTo(map);

    var ractive = new Ractive(options);

    ractive.on('thing', function(evt) {
    });
})();

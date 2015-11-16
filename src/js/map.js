/* globals Ractive, _, Markers, google */

var insitu;
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

    insitu = new Ractive(options);

    var centre, map;
    insitu.on('mapInit', function(evt) {
        centre = {lat: -33.785, lng: 151.121};
        map = new google.maps.Map(document.getElementById('map'), {
            center: centre,
            zoom: 18
        });
    });

})();

function initMap() {
    insitu.fire('mapInit');
}

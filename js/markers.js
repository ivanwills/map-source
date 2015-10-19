/*global Marker */

var Markers = function(map, centre, ractive) {
    // MAP ...
    //

    var box    = [ 0.015, 0.025 ];
    var radius = 0.0036;
    var max    = 20;
    var pins   = 500;

    this.markers = [];
    for ( var i = 0; i < pins; i++ ) {
        this.markers.push(new Marker({
            centre: centre,
            box   : box,
            map   : map,
            click : function(latLng) {
                console.log(latLng);
                ractive.set('pos', latLng);
            }.bind(this)
        }));
    }

    setInterval(function() {
        for (var i in this.markers) {
            this.markers[i].move();
        }
    }.bind(this), 200);

    setInterval(function() {
        for (var i in this.markers) {
            var count = 0;
            for (var j in this.markers) {
                if (i !== j) {
                    var dist = this.markers[i].dist(this.markers[j]);
                    if (dist < radius) {
                        count++;
                    }
                }
            }
            if (count > max) {
                this.markers[i].mark(radius);
            }
            else if (this.markers[i].isMarked()) {
                this.markers[i].removeMark();
            }
        }
    }.bind(this), 500);

};

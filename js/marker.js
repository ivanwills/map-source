
var Marker = function(options) {
    this.centre = options.centre;
    this.box    = options.box;
    this.map    = options.map;
    this.click  = options.click;
    this.init();
    this.marker = L.marker([this.lat, this.lng]).addTo(this.map);
};

Marker.prototype.init = function() {
    this.lat = this.centre[0] + Math.random() * this.box[0] * 2 - this.box[0];
    this.lng = this.centre[1] + Math.random() * this.box[1] * 2 - this.box[1];

    this.setSpeed();
};

Marker.prototype.setSpeed = function() {
    this.speedLat = Math.random() * this.box[0] / 400 - this.box[0] / 800;
    this.speedLng = Math.random() * this.box[1] / 400 - this.box[1] / 800;
};

Marker.prototype.move = function() {
    if (Math.random() > 0.95) {
        this.setSpeed();
    }

    var pos = this.getLatLng();
    pos.lat += this.speedLat;
    pos.lng += this.speedLng;
    this.marker.setLatLng(pos);

    if (this.isMarked()) {
        this.circle.setLatLng(pos);
    }
};

Marker.prototype.getLatLng = function(marker) {
    return this.isMarked() ? this.circle.getLatLng() : this.marker.getLatLng();
};

Marker.prototype.dist = function(marker) {
    var pos1 = this.getLatLng();
    var pos2 = marker.getLatLng();
    var lat = pos1.lat - pos2.lat;
    var lng = pos1.lng - pos2.lng;
    return Math.sqrt( lat * lat + lng * lng );
};

Marker.prototype.mark = function(radius) {
    if (this.isMarked()) {
        this.circle.setRadius(radius * 50000);
        return;
    }

    var pos = this.marker.getLatLng();
    this.circle = L.circle([pos.lat, pos.lng], radius * 50000, {
        color: '#f03',
        opacity: 0.3,
        fillColor: '#f03',
        fillOpacity: 0.3
    }).addTo(this.map);
    this.circle.on('click', function(evt) {
        console.log(evt);
        this.click(this.getLatLng());
    }.bind(this));
};

Marker.prototype.isMarked = function() {
    return !!this.circle;
};

Marker.prototype.removeMark = function() {
    if (this.isMarked()) {
        this.circle.setRadius(0);
    }
};

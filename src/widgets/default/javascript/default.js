/* global Ractive */
var Widget = function (options) {

	options.template = Ractive.defaults.templates['default'];

	this.ractive =  new Ractive(options);

};

Widget.prototype.someMethod = function() {
};

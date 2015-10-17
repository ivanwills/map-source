/* globals Ractive, RactiveF, _, superagent */

(function() {
	var options = {};
	options.el = document.querySelector('#container');
	options.components = {};
	options.computed = {};
	options.template = '#template';
	options.data = {};

	_.extend(options.components, RactiveF.components);
	_.extend(options.computed, {
	});

	var ractive = new Ractive(options);

	ractive.on('thing', function(evt) {
	});
})();

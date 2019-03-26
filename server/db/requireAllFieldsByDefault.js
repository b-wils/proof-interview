_=require('underscore')

module.exports = function(schema) {
	_.each(_.keys(schema.paths), function (attr) {
	    if (schema.path(attr).isRequired == undefined) {
	        schema.path(attr).required(true);
	    }
	});
}
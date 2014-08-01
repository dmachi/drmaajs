var declare = require("dojo-declare/declare");



var QueueInfo = exports.QueueInfo= declare([], {
	name: "",
        constructor: function(params){
                params = params || {}
                for (var prop in params){
                        this[prop]=params[prop];
                }
        }
});

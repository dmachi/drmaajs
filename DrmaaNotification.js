var declare = require("dojo-declare/declare");


var DrmaaNotification = exports.DrmaaNotification= declare([], {
	event: null,
	jobId: "",
	sessionName: "",
	jobState: null,
        constructor: function(params){
                params = params || {}
                for (var prop in params){
                        this[prop]=params[prop];
                }
        }
});

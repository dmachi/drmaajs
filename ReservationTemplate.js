var declare = require("dojo-declare/declare");
var drmaa = require("./drmaa");

var ReservationTemplate = exports.ReservationTemplate = declare([], {
	reservationName: "",
	startTime: null,
	endTime: null,
	duration: null,
	minSlots: null,
	maxSlots: null,
	jobCategory: "",
	usersACL: [],
	candidateMachines: [],
	minPhysMemory: null,
	machineOS: null,
	machineArch: null,
        constructor: function(params){
                params = params || {}
                for (var prop in params){
                        this[prop]=params[prop];
                }
        }

});



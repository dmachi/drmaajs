var declare = require("dojo-declare/declare");
var drmaa = require("./drmaa");

var ReservationInfo = exports.ReservationInfo= declare([], {
	reservationId: "",
	reservationName: "",
	reservedStartTime: null,
	reservedEndTime: null,
	usersACL:[],
	reservedSlots: null,
	reservedMachines: [],
        constructor: function(params){
                params = params || {}
                for (var prop in params){
                        this[prop]=params[prop];
                }
        }
});



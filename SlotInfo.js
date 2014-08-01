var declare = require("dojo-declare/declare");
var drmaa = require("./drmaa");

var SlotInfo = exports.SlotInfo = declare([], {
	machineName: "",
	slots: null,
        constructor: function(params){
                params = params || {}
                for (var prop in params){
                        this[prop]=params[prop];
                }
        }
});

var declare = require("dojo-declare/declare");


var MachineInfo = exports.MachineInfo = declare([],{
	name: "",
	available: false,
	sockets: 1,
	coresPerSocket: 1,
	threadsPerCore: 1,
	load: null,
	physMemory: null,
	virtMemory: null,
	machineOS: null,
	machineOSVersion: null,
	machineArch: null,
        constructor: function(params){
                params = params || {}
                for (var prop in params){
                        this[prop]=params[prop];
                }
        }
});

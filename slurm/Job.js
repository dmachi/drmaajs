var drmaa = require("./drmaa");
var defer = require("promised-io/promise").defer;
var declare = require("dojo-declare/declare");
var slurm = require("./slurm-cli");
var JobBase = require("../Job").Job;

var Job = exports.Job= declare([JobBase], {
	suspend: function(){

	},
	resume: function(){

	},
	hold: function(){

	},
	release: function(){

	},
	terminate: function(){

	},
	getState: function(jobSubState){

	},
	getInfo: function(){

	},
	waitStarted: function(timeout){

	},
	waitTerminated: function(timeout){

	}
});

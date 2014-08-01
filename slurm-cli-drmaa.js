var drmaa = require("./drmaa");
var execFile = require("child_process").execFile;
var defer = require("promised-io/promise").defer;
var declare = require("dojo-declare/declare");

Object.keys(drmaa).forEach(function(key){
	exports[key] = drmaa[key];
});

var SBATCH = "/usr/bin/sbatch";
var SRUN = "/usr/bin/srun";
var SINFO= "/usr/bin/sinfo";
var SCONTROL = "/usr/bin/scontrol";

var sbatch = exports.sbatch = function(args, opts){
	opts=opts||{};
	var cmdArgs = Object.keys(args).map(function(prop){
		return "--" + prop + "=" + args[prop]
	});
	var def = new defer();
	execFile(SBATCH,cmdArgs, opts, function(err,stdout,stderr){
		if (err) { def.reject(err) ; return; }
		def.resolve({stdout: stdout, stderr: stderr});	
	});
	return def.promise;
}
var sinfo = exports.sinfo = function(args, opts){
	opts=opts||{};
	var cmdArgs = Object.keys(args).map(function(prop){
		return "--" + prop + "=" + args[prop]
	});
	var def = new defer();
	execFile(SINFO,cmdArgs, opts, function(err,stdout,stderr){
		if (err) { def.reject(err) ; return; }
		def.resolve({stdout: stdout, stderr: stderr});	
	});
	return def.promise;
}

var srun = exports.srun = function(args, opts){
	opts=opts||{};
	var cmdArgs = Object.keys(args).map(function(prop){
		return "--" + prop + "=" + args[prop]
	});
	var def = new defer();
	execFile(SRUN,cmdArgs, opts, function(err,stdout,stderr){
		if (err) { def.reject(err) ; return; }
		def.resolve({stdout: stdout, stderr: stderr});	
	});
	return def.promise;
}

var scontrol = exports.scontrol = function(args, opts){
	opts=opts||{};
	var cmdArgs = Object.keys(args).map(function(prop){
		return "--" + prop + "=" + args[prop]
	});
	var def = new defer();
	execFile(SCONTROL,cmdArgs, opts, function(err,stdout,stderr){
		if (err) { def.reject(err) ; return; }
		def.resolve({stdout: stdout, stderr: stderr});	
	});
	return def.promise;
}

var Job = exports.Job= declare([], {
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

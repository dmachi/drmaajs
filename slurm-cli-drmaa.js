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
var SQUEUE = "/usr/bin/squeue";


var sinfo = exports.sinfo = function(args, opts){
	opts=opts||{};
	var args = Object.keys(opts).map(function(prop){
		return "--" + prop + "=" + opts[prop]
	});
	var def = new defer();
	execFile(SINFO,args, opts, function(err,stdout,stderr){
		if (err) { def.reject(err) ; return; }
		def.resolve({stdout: stdout, stderr: stderr});	
	});
	return def.promise;

}
var squeue = exports.squeue = function(opts){
	opts=opts||{};
	var args = Object.keys(opts).map(function(prop){
		return "--" + prop + "=" + opts[prop]
	});
	var def = new defer();
	execFile(SQUEUE,args, opts, function(err,stdout,stderr){
		if (err) { def.reject(err) ; return; }
		def.resolve({stdout: stdout, stderr: stderr});	
	});
	return def.promise;
}

var srun = exports.srun = function(opts,command,cmdArgs){
	opts=opts||{}
	cmdArgs=cmdArgs||[];

	var args = Object.keys(opts).map(function(prop){
		return "--" + prop + "=" + opts[prop]
	});
	var def = new defer();

	args.push(command);
	args = args.concat(cmdArgs);

	execFile(SRUN,args, {}, function(err,stdout,stderr){
		if (err) { def.reject(err) ; return; }
		def.resolve({stdout: stdout, stderr: stderr});	
	});
	return def.promise;
}
var sbatch = exports.sbatch = function(opts,command,cmdArgs){
	opts=opts||{}
	cmdArgs=cmdArgs||[];

	var args = Object.keys(opts).map(function(prop){
		return "--" + prop + "=" + opts[prop]
	});
	var def = new defer();

	args.push(command);
	args = args.concat(cmdArgs);

	execFile(SBATCH,args, {}, function(err,stdout,stderr){
		if (err) { def.reject(err) ; return; }
		def.resolve({stdout: stdout, stderr: stderr});	
	});
	return def.promise;
}

var scontrol = exports.scontrol= function(opts,command,cmdArgs){
	opts=opts||{}
	cmdArgs=cmdArgs||[];

	var args = Object.keys(opts).map(function(prop){
		return "--" + prop + "=" + opts[prop]
	});
	var def = new defer();

	args.push(command);
	args = args.concat(cmdArgs);

	execFile(SCONTROL,args, {}, function(err,stdout,stderr){
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

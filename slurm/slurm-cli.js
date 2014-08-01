var execFile = require("child_process").execFile;
var defer = require("promised-io/promise").defer;
var Version = require("../Version").Version;

var SBATCH = "/usr/bin/sbatch";
var SRUN = "/usr/bin/srun";
var SINFO= "/usr/bin/sinfo";
var SCONTROL = "/usr/bin/scontrol";
var SQUEUE = "/usr/bin/squeue";

var SINFO_FIELDS= [
	["partitionstate", "\"%a\""],
	["cpuspernode","\"%c\""],
	["cpustate","\"%C\""],
	["tempdiskspace","%d"],
	["numnodes","%D"],
	["nodefeatures", "\"%f\""],
	["accessgroups","\"%g\""],
	["gres","\"%G\""],
	["jobsmayshare","\"%h\""],
	["maxtime","\"%l\""],
	["memorypernode","%m"],
	["preemptionmode","\"%M\""],
	["nodehostnames","\"%n\""],
	["nodenames","\"%N\""],
	["nodeaddresses","\"%o\""],
	["partition", "\"%P\""],
	["onlyroot","\"%r\""],
	["reason","\"%R\""],
	["maxjobsize","\"%s\""],
	["allowedallocating","\"%S\""],
	["nodestate","\"%T\""],
	["schedulingweight", "\"%w\""],
	["socketspernode", "\"%X\""],
	["corespersocket", "\"%Y\""],
	["threadspercore", "\"%Z\""]
]

var SINFO_JSON_FORMAT = "{" + SINFO_FIELDS.map(function(f){
	return "\"" + f[0] + "\":" + f[1];
}).join(",") + "}";


var getDrmsInfo = exports.getDrmsInfo =  function(){
	execFile(SINFO,["--version"], opts, function(err,stdout,stderr){
		if (err) { def.reject(err) ; return; }
		var data =  stdout.split(" ");
		var res = {drmsName: data[0]}
		var vparts = data[1].split(".");
		res.version = new Version(vparts[0],vparts[1]);
		def.resolve(res);	
	});

}

var sinfo = exports.sinfo = function(args, opts){
	opts=opts||{};
	var args = Object.keys(opts).map(function(prop){
		return "--" + prop + "=" + opts[prop]
	});

        args.push("-h");
        args.push("--format=" + SINFO_JSON_FORMAT);

	var def = new defer();
	execFile(SINFO,args, opts, function(err,stdout,stderr){
		if (err) { def.reject(err) ; return; }
		var data = "[" + stdout.split("\n").filter(function(line){ return line!=="" }).join(",") + "]"
		console.log("data: ",data);
		var res = JSON.parse(data);
		def.resolve(res);	
	});
	return def.promise;
}

var SQUEUE_FIELDS = [
	["account", "\"%a\""],
//	["ntasks","\"%A\""],
	["gres","\"%b\""],
	["batchhost","\"%B\""],
	["mincpus","%c"],
	["cpus","%C"],
	["mintemp","%d"],
	["allocatednodes","%D"],
	["endtime","\"%e\""],
	["dependency","\"%E\""],
	["requiredfeatures","\"%f\""],
	["groupname","\"%g\""],
	["groupid","\"%G\""],
	['exclusive',"\"%h\""],
	['socketspernode',"\"%H\""],
	['jobid',"%i"],
	['corespersocket',"\"%I\""],
	['jobname',"\"%j\""],
	['threadspercore',"\"%J\""],
	['comment', "\"%k\""],
	['timelimit',"\"%l\""],
	['timeleft',"\"%L\""],
	['minmemory',"%m"],
	['timeused',"\"%M\""],
	['requestednodenames',"\"%n\""],
	['allocatednodenames',"\"%N\""],
	['contiguousnodesrequested',"%O"],
	['priority',"%p"],
	['partition',"\"%P\""],
	['qos',"\"%Q\""],
	['reason',"\"%r\""],
	['expectedstarttime',"\"%S\""],
	['jobstate',"\"%t\""],
	['extendedjobstate',"\"%T\""],
	['username',"\"%u\""],
	['userid',"\"%U\""],
	['reservation',"\"%v\""],
	['excludednodes',"\"%x\""]
]

var SQUEUE_JSON_FORMAT = "{" + SQUEUE_FIELDS.map(function(f){
	return "\"" + f[0] + "\":" + f[1];
}).join(",") + "}";

var squeue = exports.squeue = function(opts){
	opts=opts||{};
	var args = Object.keys(opts).map(function(prop){
		return "--" + prop + "=" + opts[prop]
	});
	args.push("-h");
	args.push("--format=" + SQUEUE_JSON_FORMAT);

	var def = new defer();
	execFile(SQUEUE,args, opts, function(err,stdout,stderr){
		if (err) { def.reject(err) ; return; }
		var data = "[" + stdout.split("\n").filter(function(line){ return line!=="" }).join(",") + "]"
		var res = JSON.parse(data);
		def.resolve(res);	
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


var SCONTROL_COMMANDS = [
	"abort",
	"all",
	"clsuter",
	"check",
	"completing",
	"create",
	"details",
	"delete",
	"hold",
	"holdu",
	"listpids",
	"notify",
	"oneliner",
	"pidinfo",
	"ping",
	"reconfigure",
	"release",
	"requeue",
	"resume",
	"setdebug",
	"setdebugflags",
	"schedloglevel",
	"show",
	"shutdown",
	"suspend",
	"takeover",
	"uhold",
	"update",
	"wait_job"
]

var scontrol = exports.scontrol = {}

var scontrolFunc = function(opts,command,cmdArgs){
	opts=opts||{}
	cmdArgs=cmdArgs||[];

	var args = Object.keys(opts).map(function(prop){
		return "--" + prop + "=" + opts[prop]
	});
	var def = new defer();

	args.push(command);
	if (typeof cmdArgs=="string") {
		cmdArgs = cmdArgs.split(" ");
	}
	args = args.concat(cmdArgs);

	execFile(SCONTROL,args, {}, function(err,stdout,stderr){
		if (err) { def.reject(err) ; return; }
		var out={}
		var d = stdout.replace(/\n/g," ");
		var sp = d.split(" ");
		sp.forEach(function(pair){
			if (pair) { 
				var tuple = pair.split("=");
				if (tuple[0] && tuple[1]) {
					tuple[0]=tuple[0].replace(/:/g,"_").replace("/","_").toLowerCase();
					if (tuple[1]=="(null)") {
						tuple[1]=null;	
					}

					if (tuple[0]=="groupid"){
						var gr=tuple[1].split("(");
						out['groupname']=gr[0];
						out['groupid'] = gr[1].replace(")","");
					}else if (tuple[0]=="userid"){
						var gr=tuple[1].split("(");
						out['usenrame']=gr[0];
						out['userid'] = gr[1].replace(")","");
					}else {
						out[tuple[0]]=tuple[1];
					}
				}
			}
		})	
		def.resolve(out);
	});
	return def.promise;
}

SCONTROL_COMMANDS.forEach(function(cmd){
	scontrol[cmd] = function(args,opts){
		return scontrolFunc(opts,cmd,args);
	}
});


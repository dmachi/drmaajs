var drmaa = require("../drmaa");
var defer = require("promised-io/promise").defer;
var when = require("promised-io/promise").when;
var declare = require("dojo-declare/declare");
var slurm = require("./slurm-cli");
var JobBase = require("../Job").Job;
var JobInfo = require("./JobInfo").JobInfo;

var Job = exports.Job= declare([JobBase], {
	constructor: function(sessionName,jobTemplate,jobId){
		var opts = this.getSBatchOpts(jobTemplate,sessionName);
		this.state="UNDETERMINED";
		var _self=this;
		this._jobDefer = new defer();
		if (jobTemplate && !jobId) {
			when(slurm.sbatch.apply(this,opts), function(results){
				_self.jobId = results.stdout.split(" job ")[1].trim();
				if (!_self.jobId){
					console.log("Error getting job id", results);
				}	
				_self._jobDefer.resolve(_self);
				console.log("Started Job " + _self.jobId);
			});
		}else if(jobId){
			this.jobId=jobId;
			when(this.getSate(), function(){
				_self._jobDefer.resolve(_self);
			});
		}
                this.interval=2000;
                //this.startMonitor();
        },

        startMonitor: function(){
		var _self=this;
                this._monitor = setTimeout(function(){
                        when(_self.getState(), function(state){
                                _self.state = state;
                                if (state=="DONE" || state == "FAILED"){
                                        _self.stopMonitor();
                                }else if (state=="QUEUED" || state=="REQUEUED"){
                                        _self.interval=="5000";
                                }else if (state=="QUEUED_HELD" || state == "REQUEUED_HELD"){
                                        _self.interval=10000;
                                }
                                if (!_self._disableMonitor) {  _self.startMonitor(); }
                        });
                },this.interval);
        },

        stopMonitor: function(){
                this._disableMonitor=true;
                clearTimeout(this._monitor);
        },

	getSBatchOpts: function(jobTemplate, sessionName){
		var opts = []
		var command = null;
		var cmdArgs = [];
		var hasEmail=false;
		Object.keys(jobTemplate).forEach(function(key){
			console.log("Check Key: ", key, jobTemplate[key]);
			if (!jobTemplate[key]) { return; }
			switch(key) {
				case "workingDirectory":
					opts.push("--workdir=" + jobTemplate[key]);
					break;
				case "submitAsHold":
					opts.push("-H");
					break;
				case "rerunnable":
					if (!jobTemplate[key]){
						opts.push("--no-requeue");
					}
					break;
				case "jobEnvironment":
					Object.keys(jobTemplate[key]).forEach(function(envvar){
						opts.push("--export=" + envvar + "=" + jobTemplate[key][envar]);
					});
					break;
				case "email":
					jobTemplate[key].forEach(function(addr){
						opts.push("--mail-user=" + addr);
					});
					break;
				case "emailOnTerminated":
				case "emailOnStarted":
					if (!hasEmail){
						opts.push("--mail-type=ALL");
						hasEmail=true;
					}
					break;
				case "jobName": 
					opts.push("-J");
					opts.push(jobTemplate[key]);
					break;	
				case "inputPath":
					opts.push("--input=" + jobTemplate[key]);
					break;
				case "outputPath":
					opts.push("--output=" + jobTemplate[key]);
					break;
				case "errorPath":
					opts.push("--error=" + jobTemplate[key]);
					break;
				case "reservationId":
					opts.push("--reservation=" + jobTemplate[key]);
					break;
				case "queueName":
					opts.push("--partition=" + jobTemplate[key]);
					break;
				case "remoteCommand":
				case "args":
				case "minSlots":
				case "maxSlots":
					break;
				case "priority":
					opts.push("--nice=" + jobTemplate[key]);
					break;
				case "candidateMachines":
					break;
				case "minPhysMemory":
					opts.push("--mem-per-cpu=" + jobTemplate[key]);
					break;
				case "startTime": 
					opts.push("--begin=" + jobTemplate[key]);
					break;
				case "deadlineTime": 
					opts.push("--time=" + jobTemplate[key]);
					break;
				case "accountingId": 				
					opts.push("--account=" + jobTemplate[key]);
					break;
				case "nativeParams": 
					jobTemplate[key].split(" ").forEach(function(i){
						opts.push(i);	
					});
				default: 
					console.log("Ignoring Template Property: ", key);
			}
		});

		console.log("opts: ", opts);
		return [opts.join(' '),jobTemplate.remoteCommand,jobTemplate.args];
	},
	suspend: function(){
		return when(slurm.scontrol.suspend(this.jobId), function(results){
			console.log("Suspend Results: ", results.stdout, results.stderr);
		});
	},
	resume: function(){
		return when(slurm.scontrol.resume(this.jobId), function(results){
			console.log("Resume Results: ", results.stdout, results.stderr);
		});
	
	},
	hold: function(){
		return when(slurm.scontrol.suspend(this.jobId), function(results){
			console.log("hold Results: ", results.stdout, results.stderr);
		});
	
	},
	release: function(){
		return when(slurm.scontrol.release(this.jobId), function(results){
			console.log("release Results: ", results.stdout, results.stderr);
		});
	
	},
	terminate: function(){
		return when(slurm.scontrol.suspend(this.jobId), function(results){
			console.log("terminate Results: ", results.stdout, results.stderr);
		});
	
	},
	getState: function(jobSubState){
		var _self=this;	
		if (this.state=="DONE") {
			return this.state;
		}
		return when(this.getInfo(), function(){
			return _self.state;
		});
	},
	setState: function(state){
		var _self=this;
		if (this.state != state){
			var orig = this.state;
			console.log("Set State for: ", state," Refresh JobInfo");
			return when(_self.getInfo(), function(info){
				_self.emit(_self.state, {job: info});
				_self.emit("StateChanged",{oldState: orig, newState: _self.state, job: info});
			});
		}
		return state;
	},
	getInfo: function(){
		console.log("this.jobId: ", this.jobId);
		var _self=this;
		if (this.state=="DONE") {
			return this.jobInfo;
		}
		return when(this.jobId || this._jobDefer, function(){
			return when(slurm.scontrol.show("job " + _self.jobId), function(jobInfo){
				_self.jobInfo = new JobInfo(jobInfo);
				_self.state = _self.jobInfo.jobState;
				return _self.jobInfo;
			});
		});
	},
	waitStarted: function(timeout){

	},
	waitTerminated: function(timeout){

	}
});

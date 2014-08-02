var drmaa = require("../drmaa");
var defer = require("promised-io/promise").defer;
var when = require("promised-io/promise").when;
var declare = require("dojo-declare/declare");
var slurm = require("./slurm-cli");
var MonitoringSessionBase = require("../MonitoringSession").MonitoringSession;
var JobInfo = require("./JobInfo").JobInfo;

var MonitoringSession = exports.MonitoringSession = declare([MonitoringSessionBase], {
        constructor: function(sessionManager){
		this.interval=1000;
		this.sessionManager = sessionManager;
		this._stateMap = {};
		this.startMonitor();
		console.log("Slurm MonitoringSession Startup");
	},

        startMonitor: function(){
                var _self=this;
                this._monitor = setTimeout(function(){
                        when(_self._getSlurmJobs(), function(jobs){
                                if (!jobs){ console.log("No Slurm Jobs Found"); return; }
                                //console.log("Found ", jobs.length, " Slurm Jobs");
                                //console.log("jobs[0]: ", jobs[0]);
				if (!_self._disableMonitor) {  _self.startMonitor(); }
                        });
                },this.interval);
        },

        _getSlurmJobs: function(){
                //console.log("_getSlurmJobs()");
                var _self=this;
                return when(slurm.squeue({"states":"all"}), function(sjobs){
                        var map={}
                        sjobs.forEach(function(job){
				var initialState=false;
				if (_self._stateMap[job.jobid]!=new JobInfo(job).jobState){
					
					if (!_self._stateMap[job.jobid]){
						console.log("Found New Job in Slurm: ", job.jobid, new JobInfo(job).jobState);
						var msg = {type: "JobDiscovered", job: new JobInfo(job).jobState};
						_self.emit("JobDiscovered", msg);
						initialState=true;	
					}
					var curState = _self._stateMap[job.jobid];
                                	_self._stateMap[job.jobid]=new JobInfo(job).jobState;
					if (!initialState){
						var msg = {type:"MonitoredJobStateChange", jobId: job.jobid, oldState: curState, newState: _self._stateMap[job.jobid]} 
						console.log("EMIT Message: ", msg);
						_self.emit("MonitoredJobStateChange", msg);
					}
				}	
                        });
			return sjobs.map(function(j) { return new JobInfo(j); });
			
                });
        },
	
	getAllJobs: function(){
		
	},

        stopMonitor: function(){
                this._disableMonitor=true;
                clearTimeout(this._monitor);
        },

});


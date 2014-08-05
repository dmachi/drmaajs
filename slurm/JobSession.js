var drmaa = require("../drmaa");
var defer = require("promised-io/promise").defer;
var when = require("promised-io/promise").when;
var declare = require("dojo-declare/declare");
var slurm = require("./slurm-cli");
var JobSessionBase = require("../JobSession").JobSession;
var Job = require("./Job").Job;
var JobTemplate = require("../JobTemplate").JobTemplate;
var JobInfo = require("./JobInfo").JobInfo;
var slurm = require("./slurm-cli");

var jobIdIndex=1;

var JobSession = exports.JobSession= declare([JobSessionBase], {
	runJob: function(jobTemplate){
		if (!(jobTemplate instanceof JobTemplate)){
			throw new exceptions.InvalidArgumentExcpetion("Job Template must be an instance of JobTemplate");
		}

		var job = new Job(this.sessionName,jobTemplate);
		this.jobs.push(job);
		return job;		
	},
	reattachJob: function(jobId){
		var _self=this;
		return when(this.getJobs(), function(jobs){
			var job;
			jobs.some(function(sjob){		
				if (sjob.jobId==jobId){
					job=sjob;
				}
			})
			if (!job){	
				job = new Job(this.sessionName,null,jobId);
				_self.jobs.push(job);
			}
			return job;

		});
	}
});

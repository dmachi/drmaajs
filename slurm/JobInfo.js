var drmaa = require("../drmaa");
var defer = require("promised-io/promise").defer;
var when = require("promised-io/promise").when;
var declare = require("dojo-declare/declare");
var slurm = require("./slurm-cli");
var JobInfoBase = require("../JobInfo").JobInfo;

var JobInfo = exports.JobInfo= declare([JobInfoBase], {
        constructor: function(slurmJobInfo){
		this.jobId = parseInt(slurmJobInfo.jobid);
		this.exitStatus = slurmJobInfo.exitcode || undefined;
		var sState = slurmJobInfo.extendedjobstate || slurmJobInfo.jobstate;
		switch(sState ){
			case "PD":
			case "PENDING":
				this.jobState = "QUEUED";
				break;
			case "R":
			case "RUNNING":
				this.jobState = "RUNNING";
				break;
			case "SUSPENDED":
				this.jobState = "SUSPENDED";
				this.jobSubState =sState
				break;
			case "CANCELLED":
				this.jobState = "DONE";
				this.jobSubState = "CANCELLED"
				break;
			case "COMPLETING":
				this.jobState = "RUNNING";
				this.jobSubState = "COMPLETING"
				break;
			case "CD":
			case "COMPLETED":
				this.jobState = "DONE";
				this.jobSubState = sState
				break;
			case "CONFIGURING":
				this.jobState = "RUNNING";
				this.jobSubState = "CONFIGURING"
				break;
			case "FAILED":
				this.jobState = "FAILED";
				break;
			case "TIMEOUT":
			case "PREEMPTED":
			case "NODE_FAIL":	
				this.jobState = "FAILED";
				this.jobSubState = sState;
				break;
			default: 
				this.jobState = "UNDETERMINED"
		}
		
		this.allocatedMachines = (slurmJobInfo&&slurmJobInfo.batchhost)?slurmJobInfo.batchhost.split(","):[];
		this.jobOwner = slurmJobInfo.username;
		this.slots=slurmJobInfo.numcpus || slurmJobInfo.cpus;
		this.queueName = slurmJobInfo.partition;
		this.finishTime = slurmJobInfo.endtime;
		this.dispatchTime = slurmJobInfo.starttime;
		this.submissionTime = slurmJobInfo.submittime;
		this.wallClockTime = slurmJobInfo.runtime
	}
});


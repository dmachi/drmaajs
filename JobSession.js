var declare = require("dojo-declare/declare");
var exceptions = require("./Exceptions");
var EventEmitter = require('events').EventEmitter;

var jobIdIndex=1;

var JobSession = exports.JobSession= declare([EventEmitter], {
	contact: "",
	sessionName: "",
	jobCategories: [],
	constructor: function(sessionName,contact,jobCategories){
		this.jobs = [];	
		this.sessionName = sessionName;
		this.contact = contact;
		this.jobCategories = jobCategories || [];
	},
	getJobs: function(filter){
		return this.jobs;
	},

	getJobArray: function(jobArrayId){

	},
	runJob: function(jobTemplate){
		if (!(jobTemplate instanceof JobTemplate)){
			throw new exceptions.InvalidArgumentExcpetion("Job Template must be an instance of JobTemplate");
		}

		var job = new Job(jobIdIndex++,this.sessionName,jobtemplate);
		this.jobs.push(job);
		return job;
	},
	runBulkJobs: function(jobTemplate, beginIndex, endIndex, step, maxParallel){
		if (!(jobTemplate instanceof JobTemplate)){
			throw new exceptions.InvalidArgumentExcpetion("Job Template must be an instance of JobTemplate");
		}
		throw new exceptions.UnsupportedOperationException("_runBulkJobs not yet implemented");
	},

	waitAnyStarted: function(jobs, timeout){

	},
	waitAnyTerminated: function(jobs, timeout){

	}	
});

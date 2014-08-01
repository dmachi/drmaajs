var declare = require("dojo-declare/declare");
var UnsupportedOperationException = require("./Exceptions").UnsupportedOperationException;

var Job = exports.Job= declare([], {
	jobId: "",
	sessionName: "",
	jobTemplate: "",
	constructor: function(jobId,sessionName,jobTemplate){
		this.jobId=jobId;
		this.sessionName = sessionName;
		this.jobTemplate = template;
	},
	suspend: function(){
		throw new UnsupportedOperationException("suspend() must be implemented in subclass");
	},
	resume: function(){
		throw new UnsupportedOperationException("resume() must be implemented in subclass");
	},
	hold: function(){
		throw new UnsupportedOperationException("hold() must be implemented in subclass");
	},
	release: function(){
		throw new UnsupportedOperationException("release() must be implemented in subclass");
	},
	terminate: function(){
		throw new UnsupportedOperationException("terminate() must be implemented in subclass");
	},
	getState: function(jobSubState){
		throw new UnsupportedOperationException("getState() must be implemented in subclass");
	},
	getInfo: function(){
		throw new UnsupportedOperationException("getInfo() must be implemented in subclass");
	},
	waitStarted: function(timeout){
		throw new UnsupportedOperationException("waitStarted() must be implemented in subclass");
	},
	waitTerminated: function(timeout){
		throw new UnsupportedOperationException("waitTerminated() must be implemented in subclass");
	}
});



var declare = require("dojo-declare/declare");
var drmaa = require("./drmaa");

var JobTemplate = exports.JobTemplate = declare([], {
	remoteCommand: "",
	args: [],
	submitAsHold: false,
	rerunnable: false,
	jobEnvironment: {},
	workingDirectory: "",
	jobCatgegory: "",
	email: [],
	emailOnStarted: false,
	emailOnTerminated: false,
	jobName: "",
	inputPath: "",
	outputPath: "",
	errorPath: "",
	joinFiles: "",
	reservationId: "",
	queueName: "",
	minSlots: null,
	maxSlots: null,
	priority: null,
	candidateMachines: [],
	minPhysMemory: null,
	machineOS: null,
	machineArch: null,
	startTime: null,
	deadlineTime: null,
	stageInFiles: {}, 
	stageOutFiles: {},
	resourceLimits: {},
	accountingId: "",
        constructor: function(params){
                params = params || {}
                for (var prop in params){
                        this[prop]=params[prop];
                }
        }
});

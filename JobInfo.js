var declare = require("dojo-declare/declare");

var JobInfo = exports.JobInfo = declare([], {
	jobId: "",
	exitStatus: null,
	terminatingSignal: null,
	annotation: "",
	jobState: null,
	jobSubState: null,
	allocatedMachines: [],
	submissionMachine: "",
	jobOwner: "",
	slots: 1,
	queueName: "",
	wallClockTime: null,
	cpuTime: null,
	submissionTime: null,
	dispatchTime: null,
	finishTime: null,

	constructor: function(nativeJobInfo){
		this.nativeJobInfo=nativeJobInfo;
	}
});

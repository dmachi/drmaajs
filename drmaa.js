var declare = require("dojo-declare/declare");

var JobState = exports.JobState = {
	UNDETERMINED: 0,
	QUEUED: 1,
	QUEUED_HELD: 2,
	RUNNING: 3,
	SUSPENDED: 4,
	REQUEUED: 5,	
	REQUEUED_HELD: 6,
	DONE: 7,
	FAILED: 8	
}

var OperatingSystem = exports.OperatingSystem = {
	AIX: 1,
	BSD: 2,
	LINUX: 3,
	HPUX: 4,
	IRIX: 5,
	MACOS: 6,
	SUNOS: 7,
	TRU64: 8,
	UNIXWARE: 9,
	WIN: 10,
	WINNT: 11,
	OTHER_OS: 12
}

var CpuArchitecture = exports.CpuArchitecture = {
	ALPHA: 1,
	ARM: 2,
	ARM64: 3,
	CELL: 4,
	PARISC: 5,
	PARISC64: 6,
	X86: 7,
	X64: 8,
	IA64: 9,
	MIPS: 10,
	MIPS64: 11,
	PPC: 12,
	PPC64: 13,
	SPARC: 14,
	SPARC64: 15,
	OTHER_CPU: 16
}

var ResourceLimitType = exports.ResourceLimitType = {
	CORE_FILE_SIZE: 1,
	CPU_TIME: 2,
	DATA_SIZE: 3,
	FILE_SIZE: 4,
	OPEN_FILES: 5,
	STACK_SIZE: 6,	
	VIRTUAL_MEMORY: 7,
	WALLCLOCK_TIME: 8
}

var DrmaaEvent = exports.DrmaaEvent = {
	NEW_STATE: 1,
	MIGRATED: 2,
	ATTRIBUTE_CHANGE: 3
}

var DrmaaCapability = exports.DrmaaCapability = {
	ADVANCE_RESERVATION: 1,
	RESERVE_SLOTS: 2,
	CALLBACK: 3,
	BULK_JOBS_MAXPARALLEL: 4,
	JT_EMAIL: 5,
	JT_STAGING: 6,
	JT_DEADLINE: 7,
	JT_MAXSLOTS: 8,
	JT_ACCOUNTINGID: 9,
	RT_STARTNOW: 10,
	RT_DURATION: 11,
	RT_MACHINEOS: 12,
	RT_MACHINEARCH: 13
}

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

	constructor: function(params){
		params = params || {}
		for (var prop in params){
			this[prop]=params[prop];
		}
	}
});

var ZERO_TIME = exports.ZERO_TIME = 0;
var INFINITE_TIME = exports.INFINITE_TIME = 99999999;
var NOW = exports.NOW = new Date();
var HOME_DIRECTORY = exports.HOME_DIRECTORY = 'home_directory';
var WORKING_DIRECTORY = exports.WORKING_DIRECTORY = 'working_directory';
var PARAMETRIC_INDEX = exports.PARAMETRIC_INDEX = 'parametric_index';

var SlotInfo = exports.SlotInfo = declare([], {
	machineName: "",
	slots: null,
        constructor: function(params){
                params = params || {}
                for (var prop in params){
                        this[prop]=params[prop];
                }
        }
});

var ReservationInfo = exports.ReservationInfo= declare([], {
	reservationId: "",
	reservationName: "",
	reservedStartTime: null,
	reservedEndTime: null,
	usersACL:[],
	reservedSlots: null,
	reservedMachines: [],
        constructor: function(params){
                params = params || {}
                for (var prop in params){
                        this[prop]=params[prop];
                }
        }
});

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

var ReservationTemplate = exports.ReservationTemplate = declare([], {
	reservationName: "",
	startTime: null,
	endTime: null,
	duration: null,
	minSlots: null,
	maxSlots: null,
	jobCategory: "",
	usersACL: [],
	candidateMachines: [],
	minPhysMemory: null,
	machineOS: null,
	machineArch: null,
        constructor: function(params){
                params = params || {}
                for (var prop in params){
                        this[prop]=params[prop];
                }
        }

});

var DrmaaNotification = exports.DrmaaNotification= declare([], {
	event: null,
	jobId: "",
	sessionName: "",
	jobState: null,
        constructor: function(params){
                params = params || {}
                for (var prop in params){
                        this[prop]=params[prop];
                }
        }
});

var QueueInfo = exports.QueueInfo= declare([], {
	name: "",
        constructor: function(params){
                params = params || {}
                for (var prop in params){
                        this[prop]=params[prop];
                }
        }
});

var Version = exports.Version = declare([], {
	major: "",
	minor: "",
	constructor: function(major,minor){
		if (typeof major!='object'){
			this.major=major;
			this.minor=minor;
		}else{
	                for (var prop in major){
				this[prop]=major[prop];
			}
		}
	}
});

var MachineInfo = exports.MachineInfo = declare([],{
	name: "",
	available: false,
	sockets: 1,
	coresPerSocket: 1,
	threadsPerCore: 1,
	load: null,
	physMemory: null,
	virtMemory: null,
	machineOS: null,
	machineOSVersion: null,
	machineArch: null,
        constructor: function(params){
                params = params || {}
                for (var prop in params){
                        this[prop]=params[prop];
                }
        }
});

var exceptions= [
        "DeniedByDrmsException",
	"DrmCommunicationException",
	"TryLaterException",
	"TimeoutException",
	"InternalException",
	"InvalidArgumentExcpetion",
	"InvalidSessionArgument",
	"InvalidStateException",
	"OutOfResourceExcpetion",
	"UnsupportedAttribueException",
	"UnsupportedOperationExcpetion",
	"ImplementationSepecificExcpetion"
]


exceptions.forEach(function(c){
        exports[c]=function(msg){
                //Error.call(this,msg);
                var err = new Error(msg);
                err.name=c;
               return err;
        }
});

var DrmaaCallback = exports.DrmaaCallback= declare([], {
	notify: function(){

	}
});

var ReservationSession = exports.ReservationSession= declare([], {
	contact: "",
	sessionName: "",
	getReservation: function(reservationId){

	},
	requestReservation: function(reservationTemplate){

	},
	getReservations: function(){

	}
});


var Reservation = exports.Reservation= declare([], {
	reservationId: "",
	sessionName: "",
	reservationTemplate: null,
	getInfo: function(){

	},
	terminate: function(){

	}
});


var JobArray = exports.JobArray= declare([], {
	jobArrayId: "",
	jobs: [],
	sessionName: "",
	jobTemplate: null,
	suspend: function() {

	},
	resume: function(){

	},
	hold: function(){

	},
	release: function(){

	},
	terminate: function(){

	}
});

var jobIdIndex=1;

var JobSession = exports.JobSession= declare([], {
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
			throw new InvalidArgumentExcpetion("Job Template must be an instance of JobTemplate");
		}

		var job = new Job(jobIdIndex++,this.sessionName,jobtemplate);
		this.jobs.push(job);
		return job;
	},
	runBulkJobs: function(jobTemplate, beginIndex, endIndex, step, maxParallel){
		if (!(jobTemplate instanceof JobTemplate)){
			throw new InvalidArgumentExcpetion("Job Template must be an instance of JobTemplate");
		}
		throw new UnsupportedOperationException("_runBulkJobs not yet implemented");
	},

	waitAnyStarted: function(jobs, timeout){

	},
	waitAnyTerminated: function(jobs, timeout){

	}	
});


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


var MonitoringSession = exports.MonitoringSession= declare([], {
	getAllReservations: function(){

	},
	getAllJobs: function(){

	},
	getAllQueues: function(){

	},
	getAllMachines: function(){

	}
});

var _JobSessions = {}
var _ReservationSessions = {}
var _MonitoringSessions = {}

var SessionManager = exports.SessionManager= declare([], {
	drmsName: "",
	drmsVersion: "",
	drmaaName: "drmaajs",
	drmaaVersion: new Version(2,0),
	constructor: function(drmsName){
		this.drmsName = drmsName;
		console.log("Loading DRMS Libs...");
	},
	supports: function(capability){

	},
	createJobSession: function(sessionName, contact){
		if (!sessionName) {
			throw new InvalidArgumentException("Session Name is a required parameter for 'createJobSession'");
		}
		if (_JobSessions[sessionName]){
			throw new InvalidSessionException("A Job Session with the name '" + sessionName + "' already exists");
		}
		_JobSession[sessionName] = new JobSession(sessionName,contact);

		return _JobSession[sessionName];
	},
	createReservationSession: function(sessionName,contact){
		if (!sessionName) {
			throw new InvalidArgumentException("Session Name is a required parameter for 'createReservationSession'");
		}
		if (_ReservationSessions[sessionName]){
			throw new InvalidSessionnException("A Reservation Session with the name '" + sessionName + "' already exists");
		}
		_ReservationSession[sessionName] = new JobSession(sessionName,contact);
		return _JobSession[sessionName];
	
		return new ReservationSession(sessionName, contact);	
	},
	openJobSession: function(sessionName){
		if (!sessionName) {
			throw new InvalidArgumentException("Session Name is a required parameter for 'openJobSession'");
		}
		if (!_JobSessions[sessionName]){
			throw new InvalidSessionException("Job Session with the name '" + sessionName + "' not found.");
		}
		return _JobSessions[sessionName];
	
	},
	openReservationSession: function(sessionName){
		if (!sessionName) {
			throw new InvalidArgumentException("Session Name is a required parameter for 'openReservationSession'");
		}
		if (!_ReservationSessions[sessionName]){
			throw new InvalidSessionException("Reservation Session with the name '" + sessionName + "' not found.");
		}
		return _ReservationSessions[sessionName];
	},
	openMonitoringSession: function(sessionName){
		if (!sessionName) {
			throw new InvalidArgumentException("Session Name is a required parameter for 'openMonitoringSession'");
		}
		if (!_MonitoringSessions[sessionName]){
			throw new InvalidSessionException("Monitoring Session with the name '" + sessionName + "' not found.");
		}
		return _MonitoringSessions[sessionName];
	
	},
	closeJobSession: function(session){
		return this.destroyJobSession(session.name);
	},
	closeReservationSession: function(session){
		return this.destroyJobSession(session.name);
	},
	destroyJobSession: function(sessionName){
		if (!_JobSessions[sessionName]){
			throw new InvalidSessionException("Job Session with the name '" + sessionName + "' not found.");
		}

		delete _JobSessions[sessionName];	
	},
	destroyReservationSession: function(sessionname){
		if (!_ReservationSessions[sessionName]){
			throw new InvalidSessionException("Reservation Session with the name '" + sessionName + "' not found.");
		}

		delete _ReservationSessions[sessionName];	
	
	},
	getJobSessionNames: function(){
		return Object.keys(_JobSessions);
	},
	getReservationSessionNames: function(){
		return Object.keys(_ReservationSessions);
	},
	registerEventNotification: function(callback){
		return new UnsupportedOperationExcpetion();
	}
});

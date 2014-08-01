var declare = require("dojo-declare/declare");
var exceptions = require("./Exceptions");

var _JobSessions = {}
var _ReservationSessions = {}
var _MonitoringSessions = {}

var SessionManager = exports.SessionManager= declare([], {
	drmsName: "",
	drmsVersion: "",
	drmaaName: "drmaajs",
	drmaaVersion: new Version(2,0),
	constructor: function(drmsName){
		console.log("Loading DRMS Libs...");
		try {
			this.JobSession = require("./" + drmsName).JobSession
			this.Job = require("./" + drmsName).Job
			var drmsInfo = require("./" + drmsName).getDrmsInfo();
		}catch(err){
			console.log("Unable to load DRMAA Lib for " + drmsName);
		}

		this.ready = drmsInfo;
		when(this.ready, function(){
			this.drmsName = drmsInfo.drmsName;
			this.drmsVersion = drmsInfo.version;
		});
	},
	supports: function(capability){

	},
	createJobSession: function(sessionName, contact){
		return when(this.ready, function(){
			if (!sessionName) {
				throw new exceptions.InvalidArgumentException("Session Name is a required parameter for 'createJobSession'");
			}
			if (_JobSessions[sessionName]){
				throw new exceptions.InvalidSessionException("A Job Session with the name '" + sessionName + "' already exists");
			}
			_JobSession[sessionName] = new JobSession(sessionName,contact);
	
			return _JobSession[sessionName];
		});
	},
	createReservationSession: function(sessionName,contact){
		return when(this.ready, function(){
			if (!sessionName) {
				throw new exceptions.InvalidArgumentException("Session Name is a required parameter for 'createReservationSession'");
			}
			if (_ReservationSessions[sessionName]){
				throw new exceptions.InvalidSessionnException("A Reservation Session with the name '" + sessionName + "' already exists");
			}
			_ReservationSession[sessionName] = new ReservationSession(sessionName,contact);
			return _ReservationSession[sessionName];
		});
	},
	openJobSession: function(sessionName){
		return when(this.ready, function(){
			if (!sessionName) {
				throw new exceptions.InvalidArgumentException("Session Name is a required parameter for 'openJobSession'");
			}
			if (!_JobSessions[sessionName]){
				throw new exceptions.InvalidSessionException("Job Session with the name '" + sessionName + "' not found.");
			}
			return _JobSessions[sessionName];
		});
	
	},
	openReservationSession: function(sessionName){
		return when(this.ready, function(){
			if (!sessionName) {
				throw new exceptions.InvalidArgumentException("Session Name is a required parameter for 'openReservationSession'");
			}
			if (!_ReservationSessions[sessionName]){
				throw new exceptions.InvalidSessionException("Reservation Session with the name '" + sessionName + "' not found.");
			}
			return _ReservationSessions[sessionName];
		});
	},
	openMonitoringSession: function(sessionName){
		return when(this.ready, function(){
			if (!sessionName) {
				throw new exceptions.InvalidArgumentException("Session Name is a required parameter for 'openMonitoringSession'");
			}
			if (!_MonitoringSessions[sessionName]){
				throw new exceptions.InvalidSessionException("Monitoring Session with the name '" + sessionName + "' not found.");
			}
			return _MonitoringSessions[sessionName];
		});	
	},
	closeJobSession: function(session){
		return this.destroyJobSession(session.name);
		
	},
	closeReservationSession: function(session){
		return this.destroyJobSession(session.name);
	},
	destroyJobSession: function(sessionName){
		if (!_JobSessions[sessionName]){
			throw new exceptions.InvalidSessionException("Job Session with the name '" + sessionName + "' not found.");
		}

		delete _JobSessions[sessionName];	
	},
	destroyReservationSession: function(sessionname){
		if (!_ReservationSessions[sessionName]){
			throw new exceptions.InvalidSessionException("Reservation Session with the name '" + sessionName + "' not found.");
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



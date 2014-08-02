var declare = require("dojo-declare/declare");
var exceptions = require("./Exceptions");
var Version = require("./Version").Version;
var when = require("promised-io/promise").when;
var defer = require("promised-io/promise").defer;
var _JobSessions = {}
var _ReservationSessions = {}
var _MonitoringSessions = {}


var SessionManager = exports.SessionManager= declare([], {
	drmsName: "",
	drmsVersion: "",
	drmaaName: "drmaajs",
	drmaaVersion: new Version(2,0),
        constructor: function(drmsName){
		var drmsSessionManager;
                try {
                        if (drmsName && typeof drmsName=='string') {
                		console.log("Loading DRMS Libs...");
                                var DRMSSessionManager = require("./" + drmsName).SessionManager;
                        }

                }catch(err){
                        console.log("Unable to load DRMAA Lib for " + drmsName);
                }

		if (drmsSessionManager){	
			return new DRMSSessionManager()	
		}

		this.ready = new defer();
		return this;	
        },        

	supports: function(capability){

	},
	createJobSession: function(sessionName, contact){
		var _self=this;
		console.log("createJobSession()", sessionName);
		return when(this.ready, function(){
			if (!sessionName) {
				throw new exceptions.InvalidArgumentException("Session Name is a required parameter for 'createJobSession'");
			}
			if (_JobSessions[sessionName]){
				throw new exceptions.InvalidSessionException("A Job Session with the name '" + sessionName + "' already exists");
			}
			console.log("_self", _self);
			console.log("_self  createJobSession()", _self.JobSessionCtor);
			_JobSessions[sessionName] = new _self.JobSessionCtor(sessionName,contact);
	
			return _JobSessions[sessionName];
		});
	},
	createReservationSession: function(sessionName,contact){
		var _self=this;
		return when(this.ready, function(){
			if (!sessionName) {
				throw new exceptions.InvalidArgumentException("Session Name is a required parameter for 'createReservationSession'");
			}
			if (_ReservationSessions[sessionName]){
				throw new exceptions.InvalidSessionException("A Reservation Session with the name '" + sessionName + "' already exists");
			}
			_ReservationSession[sessionName] = new _self.ReservationSessionCtor(sessionName,contact);
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
        openMonitoringSession: function(){
                var _self=this;
                return when(this.ready, function(){
                        _self.monitoringSession = new _self.MonitoringSessionCtor(_self);

                        _self.monitoringSession.on('JobDiscovered', function(msg){
				console.log("JobDisovered  <- MonitoringSession ", msg);
			});
                        _self.monitoringSession.on('MonitoredJobStateChange', function(msg){
				console.log("SessionManager <- MonitoredJobStateChange", msg);
				_self.handleJobStateChange(msg);
                        });
                });
        },

	handleJobStateChange: function(msg){
		var _self=this;
		when(this.getJobSessionNames(), function(sessionNames) {
			var def = sessionNames.map(function(sessionName){
				return when(_self.openJobSession(sessionName), function(jobSession){
					return when(jobSession.getJobs(), function(jobs){
						jobs.some(function(job){
							if (job.jobId==msg.jobId){
								job.setState(msg.newState);
							}
						});
					});
				});
			});
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



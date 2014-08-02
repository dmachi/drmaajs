var drmaa = require("../drmaa");
var defer = require("promised-io/promise").defer;
var when = require("promised-io/promise").when;
var declare = require("dojo-declare/declare");
var slurm = require("./slurm-cli");
var SessionManagerBase = require("../SessionManager").SessionManager;
var Job = require("./Job").Job;
var JobSession = require("./JobSession").JobSession
//var ReservationSession = require("./ReservationSession").ReservationSession
var MonitoringSession = require("./MonitoringSession").MonitoringSession
var JobInfo = require("./JobInfo").JobInfo;
var slurm = require("./slurm-cli");
var MonitoringSession = require("./MonitoringSession").MonitoringSession;
var Version = require("../Version").Version;
var jobIdIndex=1;

var SessionManager = exports.SessionManager= declare([SessionManagerBase], {
	drmsName: "slurm",
	constructor: function(){
		console.log("SLURM Session Manager Ctor: ", arguments);
		this.JobSessionCtor = JobSession;
		this.MonitoringSessionCtor = MonitoringSession;
		//this.ReservationSessionCtor = ReservationSession;
		this.ready = new defer();
		var _self=this;
		when(slurm.getDrmsInfo(), function(drmsInfo){
			console.log("SLURM DRMAA Ready");
			_self.drmsName = drmsInfo.drmsName;
			_self.drmVersion = drmsInfo.version;	
			_self.openMonitoringSession();
			_self.ready.resolve(true);
		});
	}
});

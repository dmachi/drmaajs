var SessionManager = require("../slurm/SessionManager").SessionManager; 
//var SessionManager = require("../SessionManager").SessionManager; 
var when=require("promised-io/promise").when;
var JobTemplate = require("../JobTemplate").JobTemplate;

var sessionManager  = new SessionManager(); 

var testJobTemplate = new JobTemplate({
	remoteCommand: "/cid/share/testing_folder/test.sh",
	workingDirectory: "/cid/share/testing_folder",
	jobName: "TestJob",
	submitAsHold: true,
	nativeParams: "-N 1 -n 1",
});

//when(sm, function(sessionManager){
	console.log("sessionManager: ", sessionManager);
	when(sessionManager.createJobSession("testSession","dmachi@dojotoolkit.org"), function(jobSession){
		console.log("jobSession: ", jobSession);
		if (!jobSession) { throw new Error("Job Session Not Created"); return;  } 
		when(sessionManager.getJobSessionNames(), function(sessionNames){
			console.log("SessionManager job session names: ", sessionNames.join(","));
		});
		when(jobSession.getJobs(), function(jobs){
			
			console.log("Initial Jobs: ", jobs.length);
			when(jobSession.runJob(testJobTemplate), function(job){
				job.on("StateChanged", function(msg){
					console.log("StateChanged: ", msg);
				});

				job.on("DONE", function(msg){
					process.exit();
				});
				setTimeout(function(){
					when(job.release(),function(){
						setTimeout(function(){
							when(job.suspend(), function(){
								setTimeout(function(){
									job.resume()
								},2000);
							});
						},1000);
					});
				},1000);
			});
		});
	});
//});

var slurm = require("./slurm-cli");
var version = require("../Version").Version;

exports = {
	JobSession: require("./JobSession").JobSession,
	Job: require("./Job").Job,
	getDrmsInfo: slurm.getDrmsInfo
}

var slurm = require("./slurm-cli");
var version = require("../Version").Version;

exports.JobSession=require("./JobSession").JobSession;
exports.Job=require("./Job").Job;
exports.SessionManager = require("./SessionManager").SessionManager;
exports.getDrmsInfo=slurm.getDrmsInfo;

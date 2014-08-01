var drmaa = require("./drmaa");
var defer = require("promised-io/promise").defer;
var declare = require("dojo-declare/declare");
var slurm = require("./slurm-cli");
var JobSessionBase = require("../JobSession").JobSession;

var JobSession = exports.JobSession= declare([JobSessionBase], {

});

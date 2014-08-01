var declare = require("dojo-declare/declare");

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

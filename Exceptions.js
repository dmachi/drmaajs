var declare = require("dojo-declare/declare");


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


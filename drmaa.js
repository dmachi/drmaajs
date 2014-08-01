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


var ZERO_TIME = exports.ZERO_TIME = 0;
var INFINITE_TIME = exports.INFINITE_TIME = 99999999;
var NOW = exports.NOW = new Date();
var HOME_DIRECTORY = exports.HOME_DIRECTORY = 'home_directory';
var WORKING_DIRECTORY = exports.WORKING_DIRECTORY = 'working_directory';
var PARAMETRIC_INDEX = exports.PARAMETRIC_INDEX = 'parametric_index';



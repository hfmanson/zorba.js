var statusElement = document.getElementById('status');
var progressElement = document.getElementById('progress');
var spinnerElement = document.getElementById('spinner');

var Module = {
	arguments: [],
	preRun: [ function() { console.log('start'); } ],
	postRun: [ function() { console.log('done'); } ],
	noExitRuntime: true,
	noInitialRun: true,
	print: function(text) {
		if (arguments.length > 1) text = Array.prototype.slice.call(arguments).join(' ');
		console.log(text);
	},
	printErr: function(text) {
		if (arguments.length > 1) text = Array.prototype.slice.call(arguments).join(' ');
		console.error(text);
	},
	setStatus: function(text) {
		if (!Module.setStatus.last) Module.setStatus.last = { time: Date.now(), text: '' };
		if (text === Module.setStatus.text) return;
		var m = text.match(/([^(]+)\((\d+(\.\d+)?)\/(\d+)\)/);
		var now = Date.now();
		if (m && now - Date.now() < 30) return; // if this is a progress update, skip it if too soon
		if (m) {
			text = m[1];
			progressElement.value = parseInt(m[2])*100;
			progressElement.max = parseInt(m[4])*100;
			progressElement.hidden = false;
			spinnerElement.hidden = false;
		} else {
			progressElement.value = null;
			progressElement.max = null;
			progressElement.hidden = true;
			if (!text) spinnerElement.style.display = 'none';
		}
		statusElement.innerHTML = text;
	},
	totalDependencies: 0,
	monitorRunDependencies: function(left) {
	  this.totalDependencies = Math.max(this.totalDependencies, left);
	  Module.setStatus(left ? 'Preparing... (' + (this.totalDependencies-left) + '/' + this.totalDependencies + ')' : 'All downloads complete.');
	}
};

Module.setStatus('Downloading...');
window.onerror = function(event) {
	// TODO: do not warn on ok events like simulating an infinite loop or exitStatus
	Module.setStatus('Exception thrown, see JavaScript console');
	spinnerElement.style.display = 'none';
	Module.setStatus = function(text) {
		if (text) Module.printErr('[post-exception status] ' + text);
};
};
// Route URL GET parameters to argc+argv
if (typeof window === "object") {
	var args = window.location.search.substr(1).trim().split('&');
	// If no args were passed arguments = [''], in which case kill the single empty string.
	if (args[0]) {
		for (var i = 0; i < args.length; i++) {
			Module['arguments'].push(decodeURIComponent(args[i]));
		}
	}
}

function run_xquery(fig) {
	return Module.ccall(
		'run_query', // name of C function
		'string', // return type
		[ 'string' ], // argument types
		[ fig ]
	); 
}
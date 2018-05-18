window.addEventListener("load", function () {
	document.getElementById("run_xquery").addEventListener("click", function () {
		var fig = document.getElementById('doc-xml').value;
		document.getElementById('svg').innerHTML = Module.ccall(
			'run_query', // name of C function
			'string', // return type
			[ 'string' ], // argument types
			[ fig ]
		); 
	}, false);
}, false);

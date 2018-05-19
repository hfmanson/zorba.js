window.addEventListener("load", function () {
	var doc_xml = document.getElementById('doc-xml')
		, svg = document.getElementById('svg')
		, fig_select = document.getElementById('fig-select')
		, run_xquery = document.getElementById("run_xquery")
		, fig_selected
		, i
		;
	
	for (i = 1; i < 20; i++) {
		fig_selected = document.createElementNS("http://www.w3.org/1999/xhtml", "option");
		fig_selected.setAttribute("value", "data/fig" + i + ".xml");
		fig_selected.textContent = "Figuur " + i;
		fig_select.appendChild(fig_selected);		
	}
	fig_select.addEventListener("change", function () {
		var fig = fig_select.options[fig_select.selectedIndex].value;
		
	 	doc_xml.value = Module.ccall(
			'get_file', // name of C function
			'string', // return type
			[ 'string' ], // argument types
			[ fig ]
		); 
	}, false);
	run_xquery.addEventListener("click", function () {
		var fig = doc_xml.value;
		svg.innerHTML = Module.ccall(
			'run_query', // name of C function
			'string', // return type
			[ 'string' ], // argument types
			[ fig ]
		); 
	}, false);
}, false);

function add(a, b) {
	var result
			
	a = parseInt(document.getElementById("aValue").value);
	b = parseInt(document.getElementById("bValue").value);
	result = a + b;

	document.getElementById("result").value = result;


	return result;
}

// If we're running under Node, 
if(typeof exports !== 'undefined') {
    exports.add = add;
}

console.log("Result");
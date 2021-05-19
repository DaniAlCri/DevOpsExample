function add(text) {
	var result = 0
	var numbers

	numbers = text.split(" ");

	for (var x of numbers)
		if(Number.isInteger(Number.parseInt(x)))
			result += Number.parseInt(x);

	console.log("Result = " + result);
	return result;
}

// If we're running under Node
if(typeof exports !== 'undefined') {
    exports.add = add;
}
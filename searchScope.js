


//https://developer.mozilla.org/en-US/docs/Glossary/Call_stack
//http://stackoverflow.com/questions/280389/how-do-you-find-out-the-caller-function-in-javascript
function searchArr(arr, elem, stack) {
    for (var x in arr) {
        if (x == elem)
            return true;
        else
            searchArr(x, elem, stack + '.' + x);
    }
}

function scanScope(whatToScan, scanValue, recPath, depth) {
    if (depth == 0)
        return;

	for (var key in whatToScan) {
        //if (key == '$' || key == 'scanScope') continue;

		if (key == scanValue) { // || whatToScan[key] == scanValue) {
			console.log(key + ' = ' + whatToScan[key]);
            console.log('found ' + recPath + '.' + key);
            return;
		} else {


            if (typeof(whatToScan[key]) === "function") {
                var srcx = whatToScan[key].toString();
                if (srcx.indexOf(scanValue) != -1) {
                    console.log('============ITS A FUNCTION');
                    console.log('found ' + recPath + '.' + key);
                    console.log(srcx);
                    return;
                }
            }

            if( (typeof whatToScan[key] === "object") && (key !== null) ) {
				scanScope(whatToScan[key], scanValue, recPath + '.' + key, depth-1);
			}
		}
	}
}

function searchWin(name) {
    scanScope(window, name, 'window', 1);
}



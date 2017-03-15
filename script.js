//	1. var colors
var colors = [
		{
			id:1,
			color:"red"
		},
		{
			id:2,
			color:"blue"
		},
		{
			id:3,
			color:"yellow"
		},
		{
			id:4,
			color:"green"
		},
		{
			id:5,
			color:"purple"
		},
		{
			id:6,
			color:"orange"
		}
];
//	var defining
var code = [];
var codeLenth = 4;
var codeMax = colors.length;
var guess = [];

//	2. var combination (math random)
function genCode(code, codeLenth, codeMax) {
	for (var i = 0; i < codeLenth; i++) {
		code.push(Math.floor(Math.random() * codeMax) + 1);
	};
	return code;
}
//console.log(genCode([], 4, colors.length));		//example usage;

//	3. input v/d user
for(var i = 0; i < colors.length ; i++){
	button = document.createElement('button');
    button.addEventListener("click", function() {
    	buildGuess(this);
	});
    button.setAttribute("id", i + 1);
    button.classList.add("pos");
    button.style.cssText = 'background-color:' + colors[i].color;
    document.getElementById("options").appendChild(button);
}

function buildGuess(elm) {
	// elm = curr elm
	if(guess.length < 4) {
		guess.push(elm.id);
		displayGuess(elm.id - 1);
	}
	if(guess.length >= 4) {
		initPush();
	}
}

function displayGuess(colorId) {
	td = document.createElement("td")
	td.classList.add("pos");
	td.style.cssText = 'background-color:' + colors[colorId].color;
	document.getElementById("guess").appendChild(td);
}

function initPush() {
	var buttonY, buttonN;
 	buttonY = document.createElement("button");
	buttonY.innerHTML = "confirm";
	buttonY.addEventListener("click", function() {
    	pushGuess();
	});
	document.getElementById("guess").appendChild(buttonY);
	buttonN = document.createElement("button");
	buttonN.innerHTML = "reset";
	buttonN.addEventListener("click", function() {
    	resetGuess();
	});
	document.getElementById("guess").appendChild(buttonN);
}

function pushGuess() {
	tr = document.createElement("tr");
	for (var i = 0; i < codeLenth; i++) {
		x = guess[i]-1;
		td = document.createElement("td");
		td.classList.add("pos");
		td.style.cssText = 'background-color:' + colors[x].color;
		tr.appendChild(td);
	};
	document.getElementById("tried").appendChild(tr);
	console.log(guess);
	console.log(code);
}

function resetGuess() {
	
}

//	4. check iput vs combinatie





// init app
genCode([], 4, colors.length)
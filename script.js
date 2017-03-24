//	1. var colors
var colors = ["red","blue","yellow","green","purple","orange"];

//	var defining
var code = [];
var codeLength = 4;
var codeMax = colors.length;
var guess = [];
var buttonY, buttonN;
var guessed = [];

//	2. var combination (math random)
function genCode(code, codeLength, codeMax) {
	for (var i = 0; i < codeLength; i++) {
		code.push(Math.floor(Math.random() * codeMax) + 1);
	};
}
//genCode(code, 4, colors.length);		//example usage;

//	3. input v/d user
for(var i = 0; i < colors.length ; i++){
	button = document.createElement('button');
    button.addEventListener("click", function() {
    	buildGuess(this);
	});
    button.setAttribute("id", i + 1);
    button.classList.add("pos");
    //button.style.cssText = 'background-color:' + colors[i].color;
    button.style.cssText = 'background-color:' + colors[i];
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
	var td = document.createElement("td")
	td.classList.add("pos");
	//td.style.cssText = 'background-color:' + colors[colorId].color;
	td.style.cssText = 'background-color:' + colors[colorId];
	document.getElementById("guess").appendChild(td);
}

function initPush() {
	if(typeof(buttonY) == "undefined") {
 		buttonY = document.createElement("button");
		buttonY.innerHTML = "confirm";
		buttonY.addEventListener("click", function() {
    		pushGuess();
		});
		document.getElementById("guess").appendChild(buttonY);
		buttonN = document.createElement("button");
		buttonN.innerHTML = "reset";
		buttonN.addEventListener("click", function() {
    		cleanUp();
		});
		document.getElementById("guess").appendChild(buttonN);
	}
}

function pushGuess() {
	var tr = document.createElement("tr");
	for (var i = 0; i < codeLength; i++) {
		x = guess[i]-1;
		var td = document.createElement("td");
		td.classList.add("pos");
		//td.style.cssText = 'background-color:' + colors[x].color;
		td.style.cssText = 'background-color:' + colors[x];
		tr.appendChild(td);
	};
	document.getElementById("tried").appendChild(tr);
	if(checkCode(code, guess, codeLength) == true) {
		alert("victory");
	} else {
		cleanUp();
	}
}

function cleanUp() {
	var guessElm = document.getElementById("guess");
	while (guessElm.hasChildNodes()) {
    	guessElm.removeChild(guessElm.lastChild);
	}
	guess = [];
	buttonY = undefined;
	buttonN = undefined;
}

//	4. check iput vs combinatie
function checkCode(code, guess, codeLength)
{
	var correct = 0;
	var almostCorrect = 0;
	var correctMark = [];
	//step 1: check correct pins
	for (var i = 0; i < codeLength; i++) {
		if(code[i] == guess[i])
		{
			correct ++;
	//step 2: mark them to skip in further check
			correctMark.push(i);
		}
	}
	//step 3: check almost correct pins
	for (var j = 0; j < codeLength; j++) {
		if(correctMark.includes(j) == true) {
			continue;
		} else {
			for (var x = 0; x < codeLength; x++) {
				if(code[j] == guess[x]) {
					if(guessed.includes(guess[x]) !== true) {
						almostCorrect ++;
						guessed.push(guess[x]);
						break;
					}
				}			
			}
		} 		
	}
	//step 4: display pins
	var red, white;
	var tr = document.getElementById("tried").lastChild;
	for (var k = 0; k < correct; k++) {
		red = document.createElement("td");
		red.classList.add("circle");
		red.style.cssText = 'background-color:red;';
		tr.appendChild(red);
	}
	for (var l = 0; l < almostCorrect; l++) {
		white = document.createElement("td");
		white.classList.add("circle");
		tr.appendChild(white);
	}
	if(correct == 4) {
		return true;
	}
	return false;
}

// init app
genCode(code, 4, colors.length);
//console.log(code); //-> cheat
// cards variable saved in cards.js
// more info on why there

const buttons = [
	{
		"bId": "easyBtn",
		"handler": switchDiffEasy
	},
	{
		"bId": "normalBtn",
		"handler": switchDiffNormal
	},
	{
		"bId": "hardBtn",
		"handler": switchDiffHard
	},
	{
		"bId": "n1",
		"handler": clickedN1
	},
	{
		"bId": "n2",
		"handler": clickedN2
	},
	{
		"bId": "n3",
		"handler": clickedN3
	},
	{
		"bId": "n4",
		"handler": clickedN4
	},
	{
		"bId": "sum",
		"handler": clickedSum
	},
	{
		"bId": "subtract",
		"handler": clickedSubtract
	},
	{
		"bId": "multiply",
		"handler": clickedMultiply
	},
	{
		"bId": "divide",
		"handler": clickedDivide
	},
	{
		"bId": "reset",
		"handler": resetCard
	}
];
let saved_number, saved_operator, new_numbers;
let current_card = {
	n1:"?",
	n2:"?",
	n3:"?",
	n4:"?"
};
displayCard(current_card);

buttons.forEach(function(button) {
	document.getElementById(button.bId).addEventListener("click", button.handler);
});

/*
what happens when you win?
for now you get a visual feedback (green = win, red = lose)
make a win and lose screen with options (buttons)
*/

function chooseCard(difficulty) {
	const diff = difficulty;
	let classes;
	
	if(diff == "easy") {
		classes = ["dotEasy", "hideDot", "hideDot"];
	}
	if(diff == "normal") {
		classes = ["dotNormal", "dotNormal", "hideDot"];
	}
	if(diff == "hard") {
		classes = ["dotHard", "dotHard", "dotHard"];
	}
	
	for(let i = 0; i < classes.length; i++) {
		document.getElementById("dot" + (i + 1)).setAttribute("class", "dot " + classes[i]);
	}
	
	const pick = Math.floor(Math.random() * cards[diff].length);
	const card = cards[diff][pick];

	return card;
}

function displayCard(card) {
	current_card = card;
	const card_handler = [
		{
			"cId": "n1",
			"cText": current_card.n1
		},
		{
			"cId": "n2",
			"cText": current_card.n2
		},
		{
			"cId": "n3",
			"cText": current_card.n3
		},
		{
			"cId": "n4",
			"cText": current_card.n4
		}
	];
	card_handler.forEach(function(handler) {
		document.getElementById(handler.cId).text = handler.cText;
		document.getElementById(handler.cId).setAttribute("class", "number-text");
	});
	if(saved_operator) {
		saved_operator.setAttribute("class", "operator");
	}
	saved_number = undefined;
	saved_operator = undefined;
	new_numbers = []; //only an array in case i add in an undo btn	
}

//reset number values and visibility
function resetCard() {
	displayCard(current_card);
}

function switchDiffEasy() {
	displayCard(chooseCard("easy"));
}

function switchDiffNormal() {
	displayCard(chooseCard("normal"));
}

function switchDiffHard() {
	displayCard(chooseCard("hard"));
}

function hideElement(element) {
	const classes = [element.getAttribute("class")];
	classes.push("hidden");
	element.setAttribute("class", classes.join(" "));
}

//what happens when you click a number
function clickedN1() {
	const temp = document.getElementById("n1");
	handleNumberSelection(temp);
}
function clickedN2() {
	const temp = document.getElementById("n2");
	handleNumberSelection(temp);
}
function clickedN3() {
	const temp = document.getElementById("n3");
	handleNumberSelection(temp);
}
function clickedN4() {
	const temp = document.getElementById("n4");
	handleNumberSelection(temp);
}

//what happens when you click an operator
function clickedSum() {
	const temp = document.getElementById("sum");
	handleOperatorSelection(temp);
}
function clickedSubtract() {
	const temp = document.getElementById("subtract");
	handleOperatorSelection(temp);
}
function clickedMultiply() {
	const temp = document.getElementById("multiply");
	handleOperatorSelection(temp);
}
function clickedDivide() {
	const temp = document.getElementById("divide");
	handleOperatorSelection(temp);
}

function handleNumberSelection(elem) {
	const temp = elem;
	if(!saved_operator){
		if(!saved_number) {
			saved_number = temp;
			temp.setAttribute("class", "number-text selected-num");
		}else{
			if(saved_number == temp){
				saved_number = undefined;
				temp.setAttribute("class", "number-text");
			}else{
				saved_number.setAttribute("class", "number-text");
				temp.setAttribute("class", "number-text selected-num");
				saved_number = temp;
			}
		}
	}
	if(saved_operator && saved_number != temp){
		const saved = parseInt(saved_number.text);
		const temp_num = parseInt(temp.text);
		new_numbers.push(calculate(saved, temp_num, saved_operator.textContent));
		const res = new_numbers[new_numbers.length-1];
		updateView(saved_number, temp, res);
		winCheck(temp);	
	}
}

function handleOperatorSelection(elem) {
	const temp = elem;
	if(saved_number) {
		if(!saved_operator) {
			saved_operator = temp;
			temp.setAttribute("class", "operator selected-op");
		}else{
			if(saved_operator == temp) {
				saved_operator = undefined;
				temp.setAttribute("class", "operator");
			}else{
				saved_operator.setAttribute("class","operator");
				temp.setAttribute("class", "operator selected-op");
				saved_operator = temp;
			}
		}
	}
}

function updateView(first, second, result){
	hideElement(first);
	second.text = result;

	saved_operator.setAttribute("class", "operator");
	saved_number = undefined;
	saved_operator = undefined;
	//just a dev helper
	//console.log(new_numbers);	
}

function winCheck(elem) {
	if(new_numbers.length == 3) {
		const classes = [elem.getAttribute("class")];
		if(new_numbers[2] == 24) {		
			classes.push("win");
			elem.setAttribute("class", classes.join(" "));
			//show win screen with options: "next card"
			//maybe store the card or remove it from the pool
		}else {
			classes.push("lose");
			elem.setAttribute("class", classes.join(" "));
			//show lose screen with options: "retry"
		}	
	}
}

function calculate(num1, num2, operator) {
	const n1 = num1, n2 = num2, op = operator;
	let total;

	if(op == "+")
		total = n1 + n2;
	if(op == "-")
		total = n1 - n2;
	if(op == "x")
		total = n1 * n2;
	if(op == "/")
		total = n1 / n2;
	
	return total;
}

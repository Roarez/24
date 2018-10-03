// cards variable saved in cards.js
// more info on why there

var circle = document.querySelector(".circle-container");
var saved_number, saved_operator, new_numbers;
var current_card = {
	n1:"?",
	n2:"?",
	n3:"?",
	n4:"?"
};
displayCard(current_card);

/*
give feedback on selected numbers and operators (change color?)
if selected again, feedback on deselection
what happens when you win?
for now you get a visual feedback (green = win, red = lose)
make a win and lose screen with options (buttons)
*/

function chooseCard(difficulty) {
	var diff = difficulty;
	var card;
	if(diff == "easy") {
		pick = Math.floor(Math.random() * cards.easy.length);
		card = cards.easy[pick];
		document.getElementById("dot1").setAttribute("class", "dot dotEasy");
		document.getElementById("dot2").setAttribute("class", "dot hideDot");
		document.getElementById("dot3").setAttribute("class", "dot hideDot");
	}
	if(diff == "normal") {
		pick = Math.floor(Math.random() * cards.normal.length);
		card = cards.normal[pick];
		document.getElementById("dot1").setAttribute("class", "dot dotNormal");
		document.getElementById("dot2").setAttribute("class", "dot dotNormal");
		document.getElementById("dot3").setAttribute("class", "dot hideDot");
	}
	if(diff == "hard") {
		pick = Math.floor(Math.random() * cards.hard.length);
		card = cards.hard[pick];
		document.getElementById("dot1").setAttribute("class", "dot dotHard");
		document.getElementById("dot2").setAttribute("class", "dot dotHard");
		document.getElementById("dot3").setAttribute("class", "dot dotHard");
	}
	return card;
}

function displayCard(card) {
	var crd = card;
	circle.querySelector("#n1").textContent = crd.n1;
	circle.querySelector("#n2").textContent = crd.n2;
	circle.querySelector("#n3").textContent = crd.n3;
	circle.querySelector("#n4").textContent = crd.n4;
	current_card = crd;
	resetCard();	
}

//reset number values and visibility
function resetCard() {
	circle.querySelector("#n1").textContent = current_card.n1;
	circle.querySelector("#n1").setAttribute("class", "number-text");
	circle.querySelector("#n2").textContent = current_card.n2;
	circle.querySelector("#n2").setAttribute("class", "number-text");
	circle.querySelector("#n3").textContent = current_card.n3;
	circle.querySelector("#n3").setAttribute("class", "number-text");
	circle.querySelector("#n4").textContent = current_card.n4;
	circle.querySelector("#n4").setAttribute("class", "number-text");
	saved_number = undefined;
	saved_operator = undefined;
	new_numbers = []; //only an array in case i add in an undo btn
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

//Adding buttons
document.getElementById("easyBtn").addEventListener("click", switchDiffEasy);
document.getElementById("normalBtn").addEventListener("click", switchDiffNormal);
document.getElementById("hardBtn").addEventListener("click", switchDiffHard);
document.getElementById("n1").addEventListener("click", clickedN1);
document.getElementById("n2").addEventListener("click", clickedN2);
document.getElementById("n3").addEventListener("click", clickedN3);
document.getElementById("n4").addEventListener("click", clickedN4);
document.getElementById("sum").addEventListener("click", clickedSum);
document.getElementById("subtract").addEventListener("click", clickedSubtract);
document.getElementById("multiply").addEventListener("click", clickedMultiply);
document.getElementById("divide").addEventListener("click", clickedDivide);
document.getElementById("reset").addEventListener("click", resetCard);

function hideElement(element) {
	var classes = [element.getAttribute("class")];
	classes.push("hidden");
	element.setAttribute("class", classes.join(" "));
}

//what happens when you click a number
function clickedN1() {
	var temp = document.getElementById("n1");
	if(!saved_operator){
		saved_number = temp;
	}
	if(saved_operator && saved_number != temp){
		var saved = parseInt(saved_number.text);
		var temp_num = parseInt(temp.text);
		new_numbers.push(calculate(saved, temp_num, saved_operator));
		var res = new_numbers[new_numbers.length-1];
		updateView(saved_number, temp, res);
		winCheck(temp);
	}
}
function clickedN2() {
	var temp = document.getElementById("n2");
	if(!saved_operator){
		saved_number = temp;
	}
	if(saved_operator && saved_number != temp){
		var saved = parseInt(saved_number.text);
		var temp_num = parseInt(temp.text);
		new_numbers.push(calculate(saved, temp_num, saved_operator));
		var res = new_numbers[new_numbers.length-1];
		updateView(saved_number, temp, res);
		winCheck(temp);
	}
}
function clickedN3() {
	var temp = document.getElementById("n3");
	if(!saved_operator){
		saved_number = temp;
	}
	if(saved_operator && saved_number != temp){
		var saved = parseInt(saved_number.text);
		var temp_num = parseInt(temp.text);
		new_numbers.push(calculate(saved, temp_num, saved_operator));
		var res = new_numbers[new_numbers.length-1];
		updateView(saved_number, temp, res);
		winCheck(temp);
	}
}
function clickedN4() {
	var temp = document.getElementById("n4");
	if(!saved_operator){
		saved_number = temp;
	}
	if(saved_operator && saved_number != temp){
		var saved = parseInt(saved_number.text);
		var temp_num = parseInt(temp.text);
		new_numbers.push(calculate(saved, temp_num, saved_operator));
		var res = new_numbers[new_numbers.length-1];
		updateView(saved_number, temp, res);
		winCheck(temp);		
	}
}

//what happens when you click an operator
function clickedSum() {
	var temp = "+";
	if(saved_operator != "+" && saved_number)
		saved_operator = temp;
}
function clickedSubtract() {
	var temp = "-";
	if(saved_operator != "-" && saved_number)
		saved_operator = temp;
}
function clickedMultiply() {
	var temp = "x";
	if(saved_operator != "x" && saved_number)
		saved_operator = temp;
}
function clickedDivide() {
	var temp = "/";
	if(saved_operator != "/" && saved_number)
		saved_operator = temp;
}

function updateView(first, second, result){
	hideElement(first);
	second.text = result;

	saved_number = undefined;
	saved_operator = undefined;
	//just a dev helper
	//console.log(new_numbers);	
}

function winCheck(elem) {
	if(new_numbers.length == 3) {
		var classes = [elem.getAttribute("class")];
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
	var n1 = num1, n2 = num2, op = operator;
	var total;

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
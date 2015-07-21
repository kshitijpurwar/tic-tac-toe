//selection 
$(document).ready(function() { //displays the dialog box for X or O slection. 
	$('#choice').dialog({
		dialogClass: "no-close",
		draggable: false,
		resizable: false,
		modal: true,
		width: 450,
		height: 275,
		show: 'puff',
		hide: 'explode'
	}).click(function() {
		$(this).dialog("close");
	});

});
$(document).ready(function() {
	$('#gameover').dialog({
		autoOpen: false,
		dialogClass: "no-close",
		draggable: false,
		resizable: false,
		modal: true,
		width: 400,
		height: 250,
		show: 'drop',
		hide: 'explode'
	}).click(function() {
		$(this).dialog("close");
	});
});



//ttt means tic tac toe            1| 2| 3     
var ttt = new Array(9); //          3| 4| 5 // array is designed as such 
//                                  6| 7| 8
for (var i = 0; i < 9; i++) { // filler loop 
	ttt[i] = i; // fills the array with its reepective index acc. to array
}

var winner;
var go = false;
var selected = false;
var chance = 1;
var human, h, c;
var dcomp;
var won;
var info = document.getElementById('ui-id-2');
var reset = document.getElementById('reset');
var cells = document.getElementsByTagName('td');
window.onload = function() {

	for (var i = 0; i < cells.length; i++) {
		cells[i].addEventListener('click', pointer)
	}
	var cross = document.getElementById('cross');
	var circle = document.getElementById('circle');
	var pg = document.getElementById('pg');
	pg.onclick = reload;
	cross.onclick = selector;
	circle.onclick = selector;
	var choice = document.getElementById('choice');
	choice.onclick = selector;
}

function reload() {
	document.location.reload();
}

function finish() {
	console.log('i ran');
	$("#gameover").dialog("open");
	var info = document.getElementById('ui-id-2');
	switch (winner) {
		case human:
			info.innerHTML = "You won the Game , keep it up !!";
			break;
		case dcomp:
			info.innerHTML = "Computer won , Better luck next time !";
			break;
		case undefined:
			info.innerHTML = "No-One won , game's Tied !!";
	}

}



function pointer(eventObj) { // controls the response on click
	var elm = eventObj.target;
	var hs = elm.id;
	if (human == 'X') {
		if (chance % 2 == 0) {
			comp();
		} else {
			if (chance == 1 || chance % 2 != 0) {
				human_input(hs);
				console.log(ttt);
				elm.innerHTML = h;
			}
		}
	} else {
		if (chance % 2 == 0) {
			human_input(hs);
			console.log(chance, hs, ttt);
			elm.innerHTML = h;
		} else {
			comp();
		}
	}
}



function human_input(text) {
	ttt[Number(text)] = human;
	cells[Number(text)].removeEventListener('click', pointer);
	cells[Number(text)].innerHTML = h;
	won = winCheck(ttt);
	chance++;
	if (won == true || chance == 10) {
		setTimeout(finish, 1000);
	} else {
		setTimeout(comp, 500)
	}
}

function comp() { //computer's response
	var d = dumb(ttt);
	cells[d].innerHTML = c;
	ttt[d] = dcomp;
	$(cells[d]).addClass('opponent');
	cells[d].removeEventListener('click', pointer);
	chance++;
	won = winCheck(ttt);
	if (won || chance == 10) {
		setTimeout(finish, 500);
	}
}


function selector(eventObj) { // controls the selector dialog box operations
	var first = eventObj.target;
	// console.log('wordBreak', first);
	switch (first.id) {
		case 'cross':
			h = '<i class="fa fa-times fa-5x "></i> ';
			c = '<i class="fa fa-circle-o fa-5x "></i>';
			human = 'X';
			dcomp = 'O';
			console.log(first.id);
			break;
		case 'circle':
			human = 'O';
			console.log(first.id);
			dcomp = 'X';
			c = '<i class="fa fa-times fa-5x "></i> ';
			h = '<i class="fa fa-circle-o fa-5x "></i>';
			break;
		case 'choice':
			h = '<i class="fa fa-times fa-5x "></i> ';
			c = '<i class="fa fa-circle-o fa-5x "></i>';
			human = 'X';
			dcomp = 'O';
			console.log(first.id);
	}
}


function winCheck(arr) { // this function takes ttt and determine whether game has winning combo;
	for (var i = 0; i < 9; i = i + 3) {
		if (arr[i] == arr[i + 1] && arr[i + 1] == arr[i + 2]) {
			mark(cells[i], cells[i + 1], cells[i + 2]);
			winner = arr[i]; //stores the winner
			return true;
		}
	}
	for (var i = 0; i < 3; i++) {
		if (arr[i] == arr[i + 3] && arr[i + 3] == arr[i + 6]) {
			mark(cells[i], cells[i + 3], cells[i + 6]);
			winner = arr[i];
			return true; // 3/	4/ 5
		} // 6/	7/ 8
	}
	if (arr[0] == arr[4] && arr[4] == arr[8]) {
		mark(cells[0], cells[4], cells[8]);
		winner = arr[0];
		return true;
	}
	if (arr[2] == arr[4] && arr[4] == arr[6]) {
		mark(cells[2], cells[4], cells[6]);
		winner = arr[2];
		return true;
	}
	return false;
}

function mark(a, b, c) { //marks the winning cells in voilet

	a.setAttribute("id", "winners");
	b.setAttribute("id", "winners");
	c.setAttribute("id", "winners");
}


function dumb(array) { // gives me a random
	var avlbl = array.filter(function(elm) {
		return !isNaN(elm);
	})
	var m = winmove(ttt, human);
	var c = winmove(ttt, dcomp);
	if (c) {
		console.log(m,c,'smart');
		return c;
	}
	else if (m || m===0) {
			return m;
		}
	else {
		console.log('random');
		return avlbl[Math.floor(Math.random() * avlbl.length)];
	}
}

function winmove(arr, p) {
	for (var i = 0; i < 9; i++) {
		if (!isNaN(arr[i])) {
			arr[i] = p;
			if (winCheckTest(arr)) {
				arr[i] = i;
				//console.log('smart');
				return i;
			}
			arr[i] = i;
		}
	}
	return false;

}

function winCheckTest(arr) { // this function takes ttt and determine whether game has winning combo;
	for (var i = 0; i < 9; i = i + 3) {
		if (arr[i] == arr[i + 1] && arr[i + 1] == arr[i + 2]) {
			/*mark(cells[i], cells[i + 1], cells[i + 2]);
			winner = arr[i];*/ //stores the winner
			return true;
		}
	}
	for (var i = 0; i < 3; i++) {
		if (arr[i] == arr[i + 3] && arr[i + 3] == arr[i + 6]) {
			/*mark(cells[i], cells[i + 3], cells[i + 6]);
			winner = arr[i];*/
			return true; // 3/	4/ 5
		} // 6/	7/ 8
	}
	if (arr[0] == arr[4] && arr[4] == arr[8]) {
		/*mark(cells[0], cells[4], cells[8]);
		winner = arr[0];*/
		return true;
	}
	if (arr[2] == arr[4] && arr[4] == arr[6]) {
		/*mark(cells[2], cells[4], cells[6]);
		winner = arr[2];*/
		return true;
	}
	return false;
}

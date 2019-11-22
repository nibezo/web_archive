let currentNum = 1;
let total = 1;
let last_user = [];
document.getElementById('current').innerHTML = currentNum;
document.getElementById('total').innerHTML = total;

let arr = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

// Выводим в алерте
function printMatrix(){
	let out = "";
	for (let i = 0; i < 10; i++) {
		for (let j = 0; j < 10; j++) {
			out += arr[i][j] + " ";
		}
		out += "\n";
	}	
	alert(out);
}

function clearField(){
	for (let i = 0; i < 10; i++) {
		for (let j = 0; j < 10; j++) {
			arr[i][j] = 0;
		}
	}	
}

function newGame(){
	clearField();
	drawMap();
	$('.block').removeClass('greenBack');
	$('.block').removeClass('redBack');
	currentNum = 1;
	document.getElementById('current').innerHTML = currentNum;
}

// Отслеживание клика по блоку
$('.block').on('click', function(){ 



	let id = $(this).attr("value");
	let i = id[0];
	let j = id[1];

	// Если ход первый, то без проверки
	if(currentNum == 1){
		userTurn(i,j);
		return;
	}

	checkTurn(i, j);
});

function checkTurn(i, j){
	let turn1 = [];
	let turn2 = [];
	let turn3 = [];
	let turn4 = [];
	let turn5 = [];
	let turn6 = [];
	let turn7 = [];
	let turn8 = [];

	let last_i = +last_user[0];
	let last_j = +last_user[1];

	// Возможные координаты для хода
	turn1[0] = last_i - 2; turn1[1] = last_j - 1;
	turn2[0] = last_i - 2; turn2[1] = last_j + 1;
	turn3[0] = last_i - 1; turn3[1] = last_j - 2;	
	turn4[0] = last_i - 1; turn4[1] = last_j + 2;
	turn5[0] = last_i + 1; turn5[1] = last_j - 2;
	turn6[0] = last_i + 1; turn6[1] = last_j + 2;
	turn7[0] = last_i + 2; turn7[1] = last_j - 1;
	turn8[0] = last_i + 2; turn8[1] = last_j + 1;

	// Является ли ход игрока возможным
	if(((i == turn1[0]) && (j == turn1[1])) || 
	   ((i == turn2[0]) && (j == turn2[1])) || 
	   ((i == turn3[0]) && (j == turn3[1])) || 
	   ((i == turn4[0]) && (j == turn4[1])) || 
	   ((i == turn5[0]) && (j == turn5[1])) || 
	   ((i == turn6[0]) && (j == turn6[1])) || 
	   ((i == turn7[0]) && (j == turn7[1])) || 
	   ((i == turn8[0]) && (j == turn8[1]))){
		userTurn(i, j);

	}

}

function colorTurn(i, j){
	let ii = +i;
	let jj = +j;
	let turn1 = [];
	let turn2 = [];
	let turn3 = [];
	let turn4 = [];
	let turn5 = [];
	let turn6 = [];
	let turn7 = [];
	let turn8 = [];

	turn1[0] = ii - 2; turn1[1] = jj - 1;
	turn2[0] = ii - 2; turn2[1] = jj + 1;
	turn3[0] = ii - 1; turn3[1] = jj - 2;	
	turn4[0] = ii - 1; turn4[1] = jj + 2;
	turn5[0] = ii + 1; turn5[1] = jj - 2;
	turn6[0] = ii + 1; turn6[1] = jj + 2;
	turn7[0] = ii + 2; turn7[1] = jj - 1;
	turn8[0] = ii + 2; turn8[1] = jj + 1;

	if((turn1[0] >= 0) && (turn1[1] >= 0)){
		if(arr[turn1[0]][turn1[1]] != 0) 
			$("div[value='"+turn1[0]+turn1[1]+"']").addClass('redBack');
		else
			$("div[value='"+turn1[0]+turn1[1]+"']").addClass('greenBack');
	}

	if((turn2[0] >= 0) && (turn2[1] >= 0)){
		if(arr[turn2[0]][turn2[1]] != 0) 
			$("div[value='"+turn2[0]+turn2[1]+"']").addClass('redBack');
		else
			$("div[value='"+turn2[0]+turn2[1]+"']").addClass('greenBack');
	}

	if((turn3[0] >= 0) && (turn3[1] >= 0)){
		if(arr[turn3[0]][turn3[1]] != 0) 
			$("div[value='"+turn3[0]+turn3[1]+"']").addClass('redBack');
		else
			$("div[value='"+turn3[0]+turn3[1]+"']").addClass('greenBack');
	}

	if((turn4[0] >= 0) && (turn4[1] >= 0)){
		if(arr[turn4[0]][turn4[1]] != 0) 
			$("div[value='"+turn4[0]+turn4[1]+"']").addClass('redBack');
		else
			$("div[value='"+turn4[0]+turn4[1]+"']").addClass('greenBack');
	}

	if((turn5[0] >= 0) && (turn5[1] >= 0)){
		if(arr[turn5[0]][turn5[1]] != 0) 
			$("div[value='"+turn5[0]+turn5[1]+"']").addClass('redBack');
		else
			$("div[value='"+turn5[0]+turn5[1]+"']").addClass('greenBack');
	}

	if((turn6[0] >= 0) && (turn6[1] >= 0)){
		if(arr[turn6[0]][turn6[1]] != 0) 
			$("div[value='"+turn6[0]+turn6[1]+"']").addClass('redBack');
		else
			$("div[value='"+turn6[0]+turn6[1]+"']").addClass('greenBack');
	}

	if((turn7[0] >= 0) && (turn7[1] >= 0)){
		if(arr[turn7[0]][turn7[1]] != 0) 
			$("div[value='"+turn7[0]+turn7[1]+"']").addClass('redBack');
		else
			$("div[value='"+turn7[0]+turn7[1]+"']").addClass('greenBack');
	}

	if((turn8[0] >= 0) && (turn8[1] >= 0)){
		if(arr[turn8[0]][turn8[1]] != 0) 
			$("div[value='"+turn8[0]+turn8[1]+"']").addClass('redBack');
		else
			$("div[value='"+turn8[0]+turn8[1]+"']").addClass('greenBack');
	}

}


// Ход игрока
function userTurn(i, j){
	if(arr[i][j] != 0) return;
	arr[i][j] = currentNum;
	document.getElementById('current').innerHTML = currentNum;
	document.getElementById('total').innerHTML = total;
	currentNum++;
	total++;

	last_user[0] = i;
	last_user[1] = j;
	drawMap();
	$('.block').removeClass('greenBack');
	$('.block').removeClass('redBack');
	colorTurn(i, j);
}


// Отображает текущее положение поля
function drawMap(){
	for (let i = 0; i < 10; i++) {
		for (let j = 0; j < 10; j++) {
			if(arr[i][j] != 0){
				$("div[value='"+i+j+"']").text(arr[i][j]);
			}else{
				$("div[value='"+i+j+"']").text("");
			}
		}
	}
}

function nightTheme(){
	$('.block').toggleClass('blockNight');
	$('#imBody').toggleClass('bodyNight');
	$('.menu').toggleClass('menuNight');
	$('.button').toggleClass('buttonNight');
	$('.score').toggleClass('scoreNight');
}

function hideScore(){
	$('.score').toggleClass('hideScore');
}
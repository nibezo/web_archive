let currentNum = 1;
let last_user = [];
let turn1 = [];
let turn2 = [];
let turn3 = [];
let turn4 = [];
let turn5 = [];
let turn6 = [];
let turn7 = [];
let turn8 = [];

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


// Ход игрока
function userTurn(i, j){
	if(arr[i][j] != 0) return;
	arr[i][j] = currentNum;
	currentNum++;
	last_user[0] = i;
	last_user[1] = j;
	drawMap();
}

// Отображает текущее положение поля
function drawMap(){
	for (let i = 0; i < 10; i++) {
		for (let j = 0; j < 10; j++) {
			if(arr[i][j] != 0){
				$("div[value='"+i+j+"']").text(arr[i][j]);
			}
		}
	}
}
